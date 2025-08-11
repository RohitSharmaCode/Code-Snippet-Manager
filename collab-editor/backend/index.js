const { exec } = require("child_process");
const fs = require("fs");
const { v4: uuid } = require("uuid");


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/collab-editor', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(' Connected to MongoDB');
}).catch(err => {
    console.error(' MongoDB connection failed:', err.message);
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Collab Editor API');
});
app.post("/run", (req, res) => {
  const { language, code } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code or language missing" });
  }

  const filename = `${uuid()}`;
  let command;

  if (language === "cpp") {
    fs.writeFileSync(`${filename}.cpp`, code);
    command = `g++ ${filename}.cpp -o ${filename} && ${filename}.exe`;
  } else if (language === "python") {
    fs.writeFileSync(`${filename}.py`, code);
    command = `python3 ${filename}.py`;
  } else {
    return res.status(400).json({ error: "Unsupported language" });
  }

  exec(command, (err, stdout, stderr) => {
    // Clean up temp files
    try {
      fs.unlinkSync(`${filename}.cpp`);
      fs.unlinkSync(`${filename}.py`);
      fs.unlinkSync(`${filename}`);
    } catch (_) {}

    if (err || stderr) {
      return res.json({ output: stderr || err.message });
    }

    res.json({ output: stdout });
  });
});



// Start server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
