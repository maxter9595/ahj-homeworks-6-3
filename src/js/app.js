import FileDownloader from "./FileDownloader";

const fileDownloader = new FileDownloader(
  "https://ahj-homeworks-6-3.onrender.com/files",
  "https://ahj-homeworks-6-3.onrender.com/file",
  // "http://localhost:3000/files",
  // "http://localhost:3000/file",
);

fileDownloader.initialize();
