const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server); // Initialize Socket.io

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Listen for user messages
    socket.on('user-message', (msg) => {
        io.emit('message', msg); // Broadcast message to all clients
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
server.listen(9000, () => {
    console.log('Server listening on port 9000');
});
