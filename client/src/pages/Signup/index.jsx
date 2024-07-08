import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
const Register = () => {
    const [username, setUsername] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        const formData = new FormData()
        formData.append("userName",username)
        formData.append("login",login)
        formData.append("password",password)
        if (image) {
            formData.append("image",image)
        }
        try {
            const response = await axios.post("http://localhost:5000/api/users/register",formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            console.log(response.data);
            navigate("/contact")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center h-screen bg-[#eeeeee]'>
                <form onSubmit={handleRegister} className='flex flex-col justify-between items-center px-12 py-6 w-[500px] h-[500px] bg-white'>
                    <h1 className='text-4xl'>Sign Up</h1>
                    <input type="text" placeholder='Nickname'
                        className='w-full h-12 border border-black outline-none pl-3'
                        onChange={(e) => setUsername(e.target.value)} />
                    <input type="text" placeholder='Username'
                        className='w-full h-12 border border-black outline-none pl-3'
                        onChange={(e) => setLogin(e.target.value)} />
                    <input type="password" placeholder='Password'
                        className='w-full h-12 border border-black outline-none pl-3'
                        onChange={(e) => setPassword(e.target.value)} />
                    <input type="file" className='w-full' onChange={(e) => setImage(e.target.files[0])} />
                    <p>Already have an account? <Link className='text-blue-950' to={"/login"}>Log In</Link></p>
                    <button className='bg-blue-500 text-white w-48 h-12'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register