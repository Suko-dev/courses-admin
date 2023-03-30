import { list } from './category-mock';

export default async function handler(req, res) {
  await new Promise((resolve) => {
    setTimeout(() => resolve(undefined), 2000);
  });
  res.status(200).json(list(req.query));
}
