import React from 'react';
import ChatBoxReciever, { ChatBoxSender } from './ChatBox';
import './ChatList.css';

function ChatList({ chats, user }) {
  return (
    <div className="chat-list">
      {chats.map((chat, index) => {
        if (chat.user === user) {
          return <ChatBoxSender key={index} message={chat.message} avatar={chat.avatar} user={chat.user} createdAt={chat.createdAt}/>;
        } else {
          return <ChatBoxReciever key={index} message={chat.message} avatar={chat.avatar} user={chat.user} createdAt={chat.createdAt}/>;
        }
      })}
    </div>
  );
}

export default ChatList;
