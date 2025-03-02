import FileDownloader from "./FileDownloader";

const fileDownloader = new FileDownloader(
  "http://localhost:3000/files",
  "http://localhost:3000/file",
);

fileDownloader.initialize();
