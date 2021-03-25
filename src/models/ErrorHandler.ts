export default class ErrorHandler extends Error {
  constructor(
    public statusCode: number,
    public status: string,
    public message: string
  ) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
  }
}
