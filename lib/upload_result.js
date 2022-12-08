"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
class UploadResult {
  constructor(result) {
    this.fileId = result.FileId;
    this.fileName = result.FileName;
    this.fileExt = result.FileExt;
  }

  toString() {
    return this.fileId;
  }
}
exports.default = UploadResult;