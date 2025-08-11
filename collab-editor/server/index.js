const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000", // React runs on 3000
    methods: ["GET", "POST"]
  }
});

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/collab-docs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Socket.IO connection
io.on('connection', socket => {
  console.log('A user connected: ' + socket.id);

  socket.on('send-changes', (delta) => {
    socket.broadcast.emit('receive-changes', delta);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ' + socket.id);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
