import fs from 'fs';
import path from 'path';

export default class ResultFile {
  constructor(api, fileInfo) {
    this.api = api;
    this.fileInfo = fileInfo;
  }

  get url() {
    return this.fileInfo.Url;
  }

  get fileName() {
    return this.fileInfo.FileName;
  }

  get fileSize() {
    return this.fileInfo.FileSize;
  }

  async save(filePath) {
    let downloadPath;

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      downloadPath = filePath + path.sep + this.fileName;
    } else {
      downloadPath = filePath;
    }

    return this.api.client.download(this.url, downloadPath);
  }
}
