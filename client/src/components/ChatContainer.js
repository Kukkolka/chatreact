import React, { useEffect, useState, useRef } from 'react';
import socketIOClient from 'socket.io-client';
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import UserLogin from './UserLogin';
import ChatList from './ChatList';
import './ChatContainer.css';


export default function ChatContainer() {
  console.log('added')
  let socketio = socketIOClient('http://localhost:5000');
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(localStorage.getItem('user'));
  const avatar = localStorage.getItem('avatar');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socketio.on('chat', handleChat);
    socketio.on('allChatMessages', (allMessages) => {
      console.log('all messages received')
      setChats(allMessages);
      setTimeout(scrollToBottom, 200);
    });

    return () => {
      socketio.off('chat', handleChat);
    };
  }, []);

  function handleChat(senderChats) {
    setChats((prevChats) => [...prevChats, senderChats]);
    if (messagesEndRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = messagesEndRef.current.parentNode;
      const scrollOffset = scrollHeight - clientHeight;
      if (scrollTop === scrollOffset) {
        scrollToBottom();
      }
    }
  }

  function sendChatToSocket(chat) {
    socketio.emit('chat', JSON.stringify(chat));
  }

  function addMessage(chat) {
    const newChat = { ...chat, user, avatar };
    sendChatToSocket(newChat);
  }

  function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('avatar');
    setUser('');
  }


  function scrollToBottom() {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <div className="header">
            <div className="user-info">
              <img src={avatar} alt="User Avatar" className="avatar" />
              <h4 className="user-name">{user}</h4>
            </div>
            <button onClick={() => logout()} className="logout-button">Log Out</button>
          </div>
          <ChatList chats={chats} user={user} />
          <div className="input-container">
            <InputText addMessage={addMessage} />
          </div>
        </div>
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
  
  
}
