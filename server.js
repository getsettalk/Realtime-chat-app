const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT ||3000;
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('newuser', 'New User Connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
/*io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});*/

 // This will emit the event to all connected sockets

/*io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});*/

io.on('connection', (socket) => {
  
  socket.on('chat message', (msg) => {
console.log('message: ' + msg);
    socket.broadcast.emit('chat message2', msg);
   // io.emit('chat message2', msg);
  });
});

server.listen(PORT, () => {
  console.log('listening on *:',PORT);
});