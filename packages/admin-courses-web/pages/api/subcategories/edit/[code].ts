import { edit } from '../category-mock';
import { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  edit(req.body);
  await new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 600);
  });
  res.status(200).send();
}
