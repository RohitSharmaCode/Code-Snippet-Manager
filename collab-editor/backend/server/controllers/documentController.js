const Document = require('../models/Document');

// Get or create a document
const getDocument = async (req, res) => {
    const documentId = req.params.id;

    if (!documentId) return res.status(400).send("Document ID is required");

    let document = await Document.findById(documentId);

    if (!document) {
        document = await Document.create({ _id: documentId, data: "" });
    }

    res.status(200).json(document);
};

// Update a document
const updateDocument = async (id, data) => {
    await Document.findByIdAndUpdate(id, { data });
};

module.exports = { getDocument, updateDocument };
