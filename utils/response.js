import { responseStatusEnum } from '../enums/responseStatus.enum.js';

class Response {
  constructor({ data, status, message, errors }) {
    this.data = data;
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  static success(data, message) {
    return new Response({
      data,
      status: responseStatusEnum.SUCCESS,
      message: message || 'success',
      errors: null,
    });
  }

  static error(message, errors) {
    return new Response({
      data: null,
      status: responseStatusEnum.ERROR,
      message,
      errors: errors ? [errors] : null,
    });
  }

  static validationErrors(errors) {
    return new Response({
      data: null,
      status: responseStatusEnum.BAD_REQUEST,
      message: 'Validation Error',
      errors: errors.array(),
    });
  }

  static unAuthorized(message) {
    return new Response({
      data: null,
      status: responseStatusEnum.UNAUTHORIZE,
      message: message || 'Unauthorized',
      errors: null,
    });
  }

  static notFound(message, errors) {
    return new Response({
      data: null,
      status: responseStatusEnum.NOT_FOUND,
      message: message || 'Invalid resource',
      errors: errors ? [errors] : null,
    });
  }

  static badRequest(message, errors) {
    return new Response({
      data: null,
      status: responseStatusEnum.BAD_REQUEST,
      message: message || 'Bad Request',
      errors: errors ? [errors] : null,
    });
  }
}

export { Response };
