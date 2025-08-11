const express = require("express");
const mongoose = require("mongoose");
const Document = require("./models/Document");
const documentRoutes = require("./routes/documentRoutes"); //  import routes
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // for parsing JSON
//....................................

// app.post("/run", (req, res) => {
//   const { code, language } = req.body;

//   // You can validate inputs here
//   if (!code || !language) {
//     return res.status(400).json({ output: "Code or language missing" });
//   }

//   // Dummy response for now
//   return res.json({ output: "Code executed successfully" });
// });

//..........................................

//  Use routes
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb://localhost:27017/google-docs-clone", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
 app.listen(5000, () => {
  console.log("Backend server running on http://localhost:5000");
});

});
