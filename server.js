// run `node server.js` in the terminal
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle offer from a user
    socket.on('offer', (offer) => {
        socket.broadcast.emit('offer', offer);
    });

    // Handle answer from a user
    socket.on('answer', (answer) => {
        socket.broadcast.emit('answer', answer);
    });

    // Handle ICE candidates
    socket.on('ice-candidate', (candidate) => {
        socket.broadcast.emit('ice-candidate', candidate);
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User  disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});