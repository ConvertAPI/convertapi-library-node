export default class UploadResult {
  constructor(fileId, fileName) {
    this.fileId = fileId;
    this.fileName = fileName;
  }

  toString() {
    return this.fileId;
  }
}
