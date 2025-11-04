import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class TimestampExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let originalResponse = exception.getResponse();
    const timestamp = new Date().toISOString();
    const method = request.method;
    const isDefaultMessage =
      typeof originalResponse === 'string' &&
      originalResponse.includes('Cannot');

    if (
      typeof originalResponse === 'string' ||
      Array.isArray(originalResponse)
    ) {
      const message = isDefaultMessage ? '' : originalResponse; // Очищаем дефолтное
      originalResponse = { message };
    }

    if (typeof originalResponse === 'object' && isDefaultMessage) {
      (originalResponse as any).message = '';
    }

    const enhancedResponse = {
      ...(typeof originalResponse === 'object'
        ? originalResponse
        : { message: originalResponse }),
      statusCode: status,
      timestamp,
      method,
      path: request.url,
      error: HttpStatus[status],
    };

    response.status(status).json(enhancedResponse);
  }
}
