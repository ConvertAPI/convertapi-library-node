export default class UploadResult {
  constructor(result) {
    this.fileId = result.FileId;
    this.fileName = result.FileName;
    this.fileExt = result.FileExt;
  }

  toString() {
    return this.fileId;
  }
}
