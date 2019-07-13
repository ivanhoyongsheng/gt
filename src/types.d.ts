import { Request, Response } from 'express';

declare interface CustomRequestBody<T> extends Request {
  body: T
}

declare interface CustomRequestQuery<T> extends Request {
  query: T
}
