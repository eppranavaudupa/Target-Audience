const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const io = require('socket.io')(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
let socketsConnected = new Set();

io.on('connection', onConnected );

function onConnected(socket) {
  console.log(socket.id); 
  socketsConnected.add(socket.id);
  io.emit('clients-total', socketsConnected.size);
  socket.on('disconnect', () => {
    console.log('socket disconnected', socket.id);
    socketsConnected.delete(socket.id);
    io.emit('clients-total', socketsConnected.size);
  });
  socket.on('message', (data) => {
    console.log(data);
    socket.broadcast.emit('chat-message', data);
  });
  socket.on("feedback", (data) => {
    socket.broadcast.emit('feedback', data);
  });
}
