const express = require('express');
const http = require('http');
const Server = require('socket.io').Server;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database('chat.db', (err) => {
  if (err) {
    console.error('Failed to connect to SQLite database:', err);
    process.exit(1);
  }
  console.log('Connected to SQLite database');
});

db.run(`
  CREATE TABLE IF NOT EXISTS chat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    avatar TEXT,
    user TEXT,
    message TEXT,
    createdAt DATETIME
  )
`);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const port = 5000;

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const connectedClients = new Set();

io.on('connection', (socket) => {
  if (connectedClients.has(socket.id)) {
    return;
  }

  connectedClients.add(socket.id);

  db.all('SELECT * FROM chat', [], (err, rows) => {
    if (err) {
      console.error('Failed to retrieve chat messages:', err);
      return;
    }

    const messages = rows
      .map((row) => {
        try {
          const { avatar, user, message, createdAt } = row;
          return { avatar, user, message, createdAt };
        } catch (error) {
          console.error('Error parsing old chat message:', error);
          return null;
        }
      })
      .filter((message) => message !== null);

    socket.emit('allChatMessages', messages);
  });

  socket.on('chat', (data) => {
    let chatData;
    try {
      chatData = JSON.parse(data);
    } catch (error) {
      console.error('Error parsing chat data:', error);
      chatData = data;
    }

    db.run(
      'INSERT INTO chat (avatar, user, message, createdAt) VALUES (?, ?, ?, ?)',
      [chatData.avatar, chatData.user, chatData.message, new Date().toISOString()],
      function (err) {
        if (err) {
          console.error('Failed to save chat message:', err);
          return;
        }

        socket.broadcast.emit('chat', chatData);
      }
    );
  });

  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
  });
});

server.listen(port, () => console.log(`Listening to port ${port}`));
