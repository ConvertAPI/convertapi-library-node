import ResultFile from './result_file';

export default class Result {
  constructor(api, response) {
    this.api = api;
    this.response = response;
  }

  get conversionCost() {
    return this.response.ConversionCost;
  }

  get jobId() {
    return this.response.JobId;
  }

  get file() {
    return this.files[0];
  }

  get files() {
    const list = this.response.Files || [];
    return list.map(file => new ResultFile(this.api, file));
  }

  async saveFiles(path) {
    const promises = this.files.map(file => file.save(path));

    return Promise.all(promises);
  }
}
