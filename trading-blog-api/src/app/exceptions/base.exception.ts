import { HttpException, HttpStatus } from '@nestjs/common';

type BaseExceptionOptions = {
  key?: string;
  message?: string;
  error?: any;
};

export class BaseException extends HttpException {
  constructor(
    statusCode: HttpStatus = 400,
    options?: BaseExceptionOptions | string,
  ) {
    if (typeof options === 'string') {
      super(options, statusCode || HttpStatus.BAD_REQUEST);
    } else {
      const { key, message, error } = options || {};
      super(
        {
          key: key || 'error.bad_request',
          message: message || 'Bad Request',
          error,
        },
        statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
