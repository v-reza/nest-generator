import { HttpException } from '@nestjs/common';
export class ResponseError {
  constructor(
    public message: string,
    public status: number,
  ) { }

  getResponse() {
    return new HttpException({
      status: this.status,
      message: this.message,
    }, this.status);
  }  
}

