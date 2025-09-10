export class ApplicationException extends Error {
  private statusCode: number;
  private description: string;
  constructor(message: string, statusCode: number, description: string) {
    super(message);
    this.name = 'ApplicationError';
    this.statusCode = statusCode || 500;
    this.description = description;
    Object.setPrototypeOf(this, ApplicationException.prototype);
  }
}
