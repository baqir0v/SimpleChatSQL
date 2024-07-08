import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    const [user, setUser] = useState([])
    const [search, setSearch] = useState("")
    const login = localStorage.getItem("login")

    const fetchData = async () => {
        const response = await axios.get("http://localhost:5000/api/users")
        setUser(response.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const filteredUsers = user.filter((user) =>
        user.userName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='flex justify-center items-center h-screen bg-[#eeeeee]'>
            <div className='flex flex-col w-[400px] h-[600px] bg-white shadow-custom'>
                <div className='flex flex-col justify-around p-4 w-full h-[18%] border-b-2 border-[#eeeeee]'>
                    <h3 className='text-4xl'>Chat</h3>
                    <p className='text-xl'>Online</p>
                </div>
                <div className='flex flex-col justify-center items-center p-4 w-full h-[12%]'>
                    <input type="text" className='w-full h-full bg-[#d3d3d3] text-black pl-2 outline-none placeholder-black'
                        onChange={e => setSearch(e.target.value)} placeholder='Search' />
                </div>
                <div className='flex flex-col py-4 w-full h-[70%] overflow-y-auto'>
                        {filteredUsers?.map((item) => {
                            return (
                                (
                                    item.login == login ? ""
                                        :
                                        <Link to={`/chat/${item.id}`} key={item.id}
                                            className='flex items-center gap-4 p-4 hover:bg-blue-300 cursor-pointer'>
                                            <img className='w-12 h-12 rounded-full'
                                                src={item.image === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNdmRpP34_YSuudNGwkNDUOYnLkK-bOxyQw&s" ?
                                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNdmRpP34_YSuudNGwkNDUOYnLkK-bOxyQw&s"
                                                    : `http://localhost:5000/public/${item.image}`
                                                }
                                                alt="" />
                                            <p>{item.userName}</p>
                                        </Link>
                                )
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default Contact