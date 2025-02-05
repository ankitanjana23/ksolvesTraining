const express = require('express');

Imports Express.js, which is used to handle HTTP routes.

const http = require('http');

Imports the built-in HTTP module to create an HTTP server.

const { Server } = require('socket.io');

Imports socket.io to handle WebSocket connections.

const path = require('path');

Provides utilities for handling and transforming file paths.

const app = express();

Initializes an Express app.

const server = http.createServer(app);

Creates an HTTP server using Express.

const io = new Server(server);

Initializes a Socket.io server on top of the HTTP server.

app.use(express.static(path.join(__dirname, 'public')));

Serves static files from the public directory.
io.on('connection', (socket) => {...});

This listens for new WebSocket connections.
When a user connects, it logs their socket.id.
socket.on('disconnect', () => {...});

Logs when a user disconnects.
app.get('/', (req, res) => {...});
Serves the index.html file when the root URL is accessed.
server.listen(9000, () => {...});
Starts the HTTP server and listens on port 9000.
