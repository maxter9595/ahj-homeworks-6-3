const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 3000;
const filesDir = path.join(__dirname, "src", "data", "files");

app.use(cors());
app.use(express.static(path.join(__dirname, "src")));

app.get("/files", (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Error reading files directory");
    }
    const fileList = files.map((filename) => {
      const filePath = path.join(filesDir, filename);
      const stats = fs.statSync(filePath);
      return {
        name: filename,
        size: (stats.size / (1024 * 1024)).toFixed(2) + " MB",
        path: filename,
        realSizeInBytes: stats.size,
      };
    });
    res.json(fileList);
  });
});

app.get("/file/:filename", (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      return res.status(500).send("File not found");
    }
    const base64Data = data.toString("base64");
    const mimeType = "application/pdf";
    const dataUrl = `data:${mimeType};base64,${base64Data}`;
    res.send(dataUrl);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
