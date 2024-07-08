import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosSend } from 'react-icons/io';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const Message = () => {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const { id } = useParams();
  const messagesEndRef = useRef(null);

  const login = localStorage.getItem('login');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages/`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/login/${login}`);
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };

  const addMessage = async (e) => {
    e.preventDefault();
    try {
      const newMessage = {
        senderID: currentUser.id,
        receiverID: user.id,
        messageText: myMessage,
      };
      const response = await axios.post('http://localhost:5000/api/messages', newMessage);
      socket.emit('newMessage', response.data);
      setMyMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [login]);

  useEffect(() => {
    if (currentUser.id) {
      fetchData();
      fetchMessages();
    }
  }, [id, currentUser.id]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      if (
        (message.senderID === currentUser.id && message.receiverID === user.id) ||
        (message.senderID === user.id && message.receiverID === currentUser.id)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [currentUser.id, user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sortedMessages = messages.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  return (
    <div className='flex justify-center items-center h-screen bg-[#eeeeee]'>
      <div className='flex flex-col justify-between w-[500px] h-[600px] bg-white shadow-custom'>
        <div className='flex gap-10 w-full h-[20%] p-4 items-center'>
          <img
            className='w-24 h-24 rounded-full'
            src={user.image === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNdmRpP34_YSuudNGwkNDUOYnLkK-bOxyQw&s" ?
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYNdmRpP34_YSuudNGwkNDUOYnLkK-bOxyQw&s"
              : `http://localhost:5000/public/${user.image}`
            }
            alt='Profile'
          />
          <h3>{user.userName}</h3>
        </div>
        <div className='flex flex-col h-[60%] m-4 overflow-y-auto '>
          {sortedMessages?.map((item) => {
            const isSender = item.senderID === currentUser.id && item.receiverID === user.id;
            const isReceiver = item.receiverID === currentUser.id && item.senderID === user.id;
            console.log(user.id);
            if (isSender || isReceiver) {
              return (
                <div
                  key={item.id}
                  className={`p-2 m-2 rounded-lg max-w-[70%] ${isSender ? 'self-end bg-blue-200' : 'self-start bg-gray-200'
                    }`}
                >
                  <p>{item.messageText}</p>
                </div>
              );
            }
            return null;
          })}
          <div ref={messagesEndRef} />
        </div>
        <form className='flex h-[10%] ' onSubmit={addMessage}>
          <div className='flex w-full h-full shadow-custom'>
            <input
              type='text'
              className='w-[85%] h-full outline-none pl-6'
              value={myMessage}
              onChange={(e) => setMyMessage(e.target.value)}
              placeholder='Type your message here...'
            />
            <button type='submit' className='flex justify-center items-center w-[15%] h-full bg-blue-100'>
              <IoIosSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
