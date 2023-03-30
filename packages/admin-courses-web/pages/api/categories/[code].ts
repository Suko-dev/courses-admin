import { find } from './category-mock';
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  const category = find(req.query.code as string);

  res.json(category);
}
