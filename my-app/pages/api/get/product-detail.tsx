import type { NextApiRequest, NextApiResponse } from 'next';
import productsList from "../json/products-list.json";
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(productsList)
}