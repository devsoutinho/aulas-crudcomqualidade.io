export class HttpNotFoundError extends Error {
  status: number;

  constructor(message: string) {
    super();
    this.message = message;
    this.status = 404;
  }
}
