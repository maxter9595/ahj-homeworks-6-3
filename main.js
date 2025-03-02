/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/FileDownloader.js
class FileDownloader {
  constructor(filesEndpoint, fileEndpoint) {
    this.filesEndpoint = filesEndpoint;
    this.fileEndpoint = fileEndpoint;
    this.statsElementId = "total-downloaded";
    this.fileListElementId = "file-list";
    this.totalDownloaded = 0;
  }
  async fetchFileList() {
    const response = await fetch(this.filesEndpoint);
    return await response.json();
  }
  async loadFileData(file) {
    const response = await fetch(`${this.fileEndpoint}/${file.path}`);
    return await response.blob();
  }
  updateDownloadStats() {
    const totalDownloadedElement = document.getElementById(this.statsElementId);
    const totalDownloadedMB = (this.totalDownloaded / (1024 * 1024)).toFixed(2);
    totalDownloadedElement.textContent = `${totalDownloadedMB} MB`;
  }
  async renderFiles() {
    const fileListElement = document.getElementById(this.fileListElementId).getElementsByTagName("tbody")[0];
    fileListElement.innerHTML = "";
    const files = await this.fetchFileList();
    for (let file of files) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = file.name;
      row.appendChild(nameCell);
      const sizeCell = document.createElement("td");
      sizeCell.textContent = file.size;
      row.appendChild(sizeCell);
      const actionCell = document.createElement("td");
      const downloadLink = document.createElement("a");
      downloadLink.textContent = "Download";
      downloadLink.className = "download-link";
      downloadLink.addEventListener("click", async event => {
        event.preventDefault();
        const blob = await this.loadFileData(file);
        const realFileSizeInBytes = file.realSizeInBytes;
        this.totalDownloaded += realFileSizeInBytes;
        this.updateDownloadStats();
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        link.click();
      });
      actionCell.appendChild(downloadLink);
      row.appendChild(actionCell);
      fileListElement.appendChild(row);
    }
  }
  initialize() {
    document.addEventListener("DOMContentLoaded", () => {
      this.renderFiles();
    });
  }
}
/* harmony default export */ const js_FileDownloader = (FileDownloader);
;// CONCATENATED MODULE: ./src/js/app.js

const fileDownloader = new js_FileDownloader("https://ahj-homeworks-6-3.onrender.com/files", "https://ahj-homeworks-6-3.onrender.com/file") // "http://localhost:3000/files",
// "http://localhost:3000/file",
;
fileDownloader.initialize();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;