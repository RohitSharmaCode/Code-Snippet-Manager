const express = require("express");
const router = express.Router();
const Document = require("../models/Document");

// Route to get a document by ID
router.get("/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (document) res.json(document);
    else res.status(404).send("Document not found");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create or update a document by ID
router.post("/:id", async (req, res) => {
  const { data } = req.body;
  try {
    let document = await Document.findById(req.params.id);
    if (document) {
      document.data = data;
      document = await document.save();
      res.json(document);
    } else {
      const newDocument = new Document({ _id: req.params.id, data });
      await newDocument.save();
      res.status(201).json(newDocument);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
