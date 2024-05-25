import xlsx from 'xlsx';
import nodemailer from 'nodemailer';
import express from "express";
import multer from 'multer';
import cron from 'node-cron';
import fs from 'fs';
import Users from '../Model/Users.js';

const router = express.Router();

// multer config
const storage = multer.diskStorage({
    destination: function(req , file ,cb){
        cb(null, 'files/');
    },
    filename: function (req , file , cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

// email sending 
const sendBirthdayEmail = async (name, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "zoyas3423@gmail.com",
                pass: 'jnljouuqdqjpghtl',
            }
        });

        const mailOptions = {
            from: "Happy Birthday <zoyas3423@gmail.com>",
            to: email,
            subject: "Birthday Wishes",
            text: `Happy Birthday, ${name}!`,
            html: `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <h1 style="color: #333; text-align: center;">Happy Birthday!</h1>
                    <p style="color: #666; text-align: center;">Dear ${name},</p>
                    <p style="color: #666; text-align: center;">Wishing you a day filled with love, laughter, and joy as you celebrate another wonderful year of life!</p>
                    <p style="color: #009688; font-weight: bold; text-align: center; font-size: 24px; margin-top: 20px;">🎉🎂🎈 Happy Birthday! 🎈🎂🎉</p>
                    <p style="color: #666; text-align: center;">Best wishes,</p>
                    <p style="color: #666; text-align: center;">Diamond Ore Pvt.Ltd</p>
                </div>
            </div>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
    } catch (error) {
        console.error("Error sending birthday email:", error);
        throw error;
    }
};


// Function to process birthdays and send emails
const processBirthdays = async (userdata) => {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    console.log("Today's Date:", today);

    for (const row of userdata.slice(1)) {
        const [name, email, dob] = row;

        if (!dob) {
            console.error("Error: dob is undefined or empty");
            continue;
        }

        const dobParts = dob.split('-'); // Assuming date format is MM/DD/YYYY
        const dobMonth = parseInt(dobParts[0]);
        const dobDay = parseInt(dobParts[1]);

        console.log("Processing:", name, email, dob);

      
            // console.log("Sending birthday email to:", name, email);
            // await sendBirthdayEmail(name, email);
            console.log("Data to be saved:", { name, email, dob: new Date() });
            await Users.create({ name, email, dob});
            console.log("Data saved to database");
    
    }
};

// Route to upload file
router.post('/upload', upload.single('excelFile'), async (req, res) => {
    if (!req.file || req.file.fieldname !== 'excelFile') {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
        console.log("File uploaded:", req.file.originalname);
        const filePath = req.file.path;
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const userdata = xlsx.utils.sheet_to_json(worksheet, { header: 1, raw: false });
        console.log("Userdata:", userdata); // Check if userdata is being parsed correctly
        await processBirthdays(userdata);
        res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error('Error in processing upload:', error);
        res.status(500).json({ error: 'Server error' });
    }
});



// Schedule the task to run every day at 4 PM
// Schedule the task to run every day at 4 PM
cron.schedule('0 10 * * *', async () => {
    try {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDay = today.getDate();
        const users = await Users.find();

        for (const user of users) {
            // Extract month, day, and year from the dob field
            const dobParts = user.dob.split('/');
            const dobMonth = parseInt(dobParts[0]);
            const dobDay = parseInt(dobParts[1]);
            const dobYear = parseInt(dobParts[2]);

            // Check if the user's birthday is today
            if (dobMonth === todayMonth && dobDay === todayDay) {
                console.log("Sending birthday email to:", user.name, user.email);
                await sendBirthdayEmail(user.name, user.email);
            }
        }
    } catch (error) {
        console.error("Error processing birthdays:", error);
    } 
});


export default router;
