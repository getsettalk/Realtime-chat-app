const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const server = http.createServer(app);
// const { Server } = require("socket.io");

const PORT = process.env.PORT ||3000;

const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
app.use(cors());


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

var totalUser = 0;
io.on('connection', (socket) => {
  console.log("socket id",socket.rooms)
  totalUser = totalUser+1;
  io.emit('status', totalUser);
  console.log('a user connected', totalUser);
  socket.broadcast.emit('newuser', 'New User Connected');
  socket.on('disconnect', (skt) => {
    // console.log('user disconnected', totalUser);
    
    totalUser = totalUser-1;
    io.emit('status', totalUser);
    socket.broadcast.emit('Discuser', 'A One user has been disconnected ?');
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
  socket.on("TypingStatus",(data)=>{
    socket.broadcast.emit("getTypingStatus",data)
    // console.log("Typing:"+data.TypingUsername)
  })

  // read images data 
  socket.on('image',(data)=>{
    // console.log(data)
    socket.broadcast.emit('imageCome', data);
  })
});

server.listen(PORT, () => {
  console.log('listening on *:',PORT);
});