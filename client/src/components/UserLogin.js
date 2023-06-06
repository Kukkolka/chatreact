import React, { useState } from 'react';
import { CommentOutlined } from '@ant-design/icons';
import _ from 'lodash';
import './UserLogin.css';

const buttonClassName = 'login-button';
const inputClassName = 'login-input';

export default function UserLogin({ setUser }) {
  const [user, setAUser] = useState('');

  function handleSetUser() {
    if (!user) return;
    localStorage.setItem('user', user);
    setUser(user);
    localStorage.setItem('avatar', `https://picsum.photos/id/${_.random(1, 1000)}/200/300`);
  }

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">
          WhatsApp
        </h1>

        <div className="login-form">
          <input
            className={inputClassName}
            value={user}
            onChange={(e) => setAUser(e.target.value)}
            placeholder="Username"
          />

          <button onClick={handleSetUser} className={buttonClassName}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
