const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// Create 'image' folder if it doesn't exist
const dir = path.join(__dirname, "/image");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Serve uploaded images
app.use("/image", express.static(path.join(__dirname, "/image")));

// Set storage location
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "image/"); // Saves in Backend/image/
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: "Image uploaded!",
    filePath: `/image/${req.file.filename}`, // Access path
    file: req.file,
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
