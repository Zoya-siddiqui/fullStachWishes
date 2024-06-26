import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    dob:{
        type: String,
        required: true
    }
});

const Users = mongoose.model('Users' , userSchema);

export default Users;