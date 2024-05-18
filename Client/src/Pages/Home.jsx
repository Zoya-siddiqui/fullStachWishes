import React, { useState } from 'react'
import axios from 'axios';

const Home = () => {

    const [file , setFile] = useState(null);

    const handleFileChange = (e) =>{
        setFile(e.target.files[0]);
    }

    const handleUpload = async  () =>{

        if (!file){
            alert ("please select a file first ")
            return ; 
        }

        const formData = new FormData();
        formData.append('excelFile' , file)

        try{
            const response = await axios.post('http://localhost:5001/api/users/upload',
                formData,{

                    headers:{
                        'Content-Type' : 'multipart/form-data'
                    }
                }
            )

           if(response.status === 200){
                alert(response.data.message)
           }
        }
        catch(error){
            console.error('error uploading file' , error)
            alert ('Error Uploading file')
        }

    }


    return (
        <>
            <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
                <div class="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1522252234503-e356532cafd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxjb2RlfGVufDB8MHx8fDE2OTQwOTg0MTZ8MA&ixlib=rb-4.0.3&q=80&w=1080" alt="Background Image" class="object-cover object-center w-full h-full" />
                    <div class="absolute inset-0 bg-black opacity-50"></div>
                </div>

                <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
                    <h1 class="text-5xl font-bold leading-tight mb-4">Welcome to Our Wishes Website</h1>
                    <p class="text-lg text-gray-300 mb-8">Upload Your Excel File Hare.</p>

                    <div className='flex'>
                        <input  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"  onChange={handleFileChange} />
                        <a type='submit' onClick={handleUpload} class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 px-6 rounded-md ml-2 text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">Upload</a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home