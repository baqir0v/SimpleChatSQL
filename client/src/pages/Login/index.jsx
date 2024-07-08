import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                login: username,
                password: password
            })
            console.log(response.data);
            localStorage.setItem("login", username)
            setUsername("")
            setPassword("")
            navigate("/contact")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='flex justify-center items-center h-screen bg-[#eeeeee]'>
            <form onSubmit={handleLogin} className='flex flex-col justify-between items-center px-12 py-6 border-black border w-[500px] h-[400px] bg-white'>
                <h1 className='text-4xl'>Login</h1>
                <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)}
                    className='w-full h-12 border border-black outline-none pl-3' />
                <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}
                    className='w-full h-12 border border-black outline-none pl-3' />
                    <p>Dont have an account? <Link className='text-blue-950' to={"/"}>Sign Up  </Link></p>
                    <button className='bg-blue-500 text-white w-48 h-12'>Submit</button>
            </form>
        </div>
    )
}

export default Login