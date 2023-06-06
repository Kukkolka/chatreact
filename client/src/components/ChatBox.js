import React from 'react';
import { Avatar, Image } from 'antd';
import './ChatBox.css';
import { formatTimestamp } from './utils';

export default function ChatBoxReceiver({ avatar, user, message, createdAt }) {
  return (
    <div className="chat-box-container chat-box-receiver">
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            className="chat-avatar chat-avatar-receiver"
            preview={false}
          />
        }
      />
      <div className="chat-content">
        <p className="chat-message chat-message-receiver">
          <strong className="chat-username">
            {user}
          </strong> <br />
          {message}
        </p>
        <span className="chat-timestamp chat-timestamp-receiver">
          {formatTimestamp(createdAt)}
        </span>
      </div>
    </div>
  );
}

export function ChatBoxSender({ avatar, user, message, createdAt }) {
  return (
    <div className="chat-box-container chat-box-sender">
      <div className="chat-content">
        <p className="chat-message chat-message-sender">
          <strong className="chat-username">
            {user}
          </strong> <br />
          {message}
        </p>
        <span className="chat-timestamp chat-timestamp-sender">
          {formatTimestamp(createdAt)}
        </span>
      </div>
      <Avatar
        size={50}
        src={
          <Image
            src={avatar}
            className="chat-avatar chat-avatar-sender"
            preview={false}
          />
        }
      />
    </div>
  );
}
