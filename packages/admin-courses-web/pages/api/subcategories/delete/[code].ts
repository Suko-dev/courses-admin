import { deleteCategory } from '../category-mock';
import { Request, Response } from 'express';

export default function handler(req: Request, res: Response) {
  const code = req.query.code as string;
  deleteCategory(code);
  res.status(200).send();
}
