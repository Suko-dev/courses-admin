import { create } from '../category-mock';
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  create(req.body);
  res.status(201).send();
}
