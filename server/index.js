const express = require("express");
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*'
  }
});

// colors
const colors = [
  { name: 'red', votes: 0 },
  { name: 'blue', votes: 0 },
  { name: 'yellow', votes: 0 },
  { name: 'black', votes: 0 },
  { name: 'pink', votes: 0 },
  { name: 'green', votes: 0 },
  { name: 'grey', votes: 0 },
  { name: 'orange', votes: 0 },
  { name: "aqua", votes: 0}
];

// socket
io.on('connection', socket => {
  socket.join('votes room')
  socket.emit('colors', colors);
  socket.on('vote', (colorName) => {
    const colorToUpdate = colors.find(color => colorName === color.name);    
    if (colorToUpdate) {
      colorToUpdate.votes++;
      io.to('votes room').emit('colors', colors);
    }    
  });
})

// listen
const port = "8000";
httpServer.listen(port);

