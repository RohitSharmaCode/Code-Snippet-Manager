const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/dist'))); // adjust if needed

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Track the current content
let codeContent = "";

io.on('connection', (socket) => {
  console.log(' A user connected:', socket.id);

  // Send the current content to the newly connected client
  socket.emit('load-code', codeContent);

  socket.on('code-change', (newCode) => {
    codeContent = newCode;
    socket.broadcast.emit('code-change', newCode);
  });

  socket.on('disconnect', () => {
    console.log(' A user disconnected:', socket.id);
  });
});
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
//...........................................
// app.post("/run", async (req, res) => {
//   const { language, code } = req.body;

//   if (language !== "cpp") {
//     return res.status(400).json({ output: "Only C++ is supported currently." });
//   }

//   const filePath = path.join(__dirname, "temp.cpp");

//   // Write code to temp file
//   fs.writeFileSync(filePath, code);

//   // Compile and Run C++ Code
//   exec(`g++ ${filePath} -o ${__dirname}/temp.out && ${__dirname}/temp.out`, (err, stdout, stderr) => {
//     if (err) {
//       return res.json({ output: stderr || "Error during compilation" });
//     }
//     res.json({ output: stdout });
//   });
// });
//..............................................................

server.listen(5000, () => {
  console.log(' Server running on http://localhost:5000');
});
