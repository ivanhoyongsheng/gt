import { Request, Response } from 'express';

declare interface CustomRequest<T> extends Request {
  body: T
}

declare interface CustomRequestQuery<T> extends Request {
  query: T
}
