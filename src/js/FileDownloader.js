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
    console.log("Loading file data for:", file.name); // Логируем имя файла
    const response = await fetch(`${this.fileEndpoint}/${file.path}`);
    if (!response.ok) {
      console.error("Failed to load file:", response.statusText); // Логируем ошибку
      throw new Error("Failed to load file");
    }
    return await response.blob();
  }

  updateDownloadStats() {
    const totalDownloadedElement = document.getElementById(this.statsElementId);
    const totalDownloadedMB = (this.totalDownloaded / (1024 * 1024)).toFixed(2);
    totalDownloadedElement.textContent = `${totalDownloadedMB} MB`;
  }

  async renderFiles() {
    const fileListElement = document
      .getElementById(this.fileListElementId)
      .getElementsByTagName("tbody")[0];
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

      downloadLink.addEventListener("click", async (event) => {
        event.preventDefault();

        const blob = await this.loadFileData(file);
        const realFileSizeInBytes = file.realSizeInBytes;
        this.totalDownloaded += realFileSizeInBytes;
        this.updateDownloadStats();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        console.log("Download link created:", link.href, link.download);
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

export default FileDownloader;
