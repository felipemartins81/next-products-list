import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import productsList from './json/products-list.json';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fechProducts() {
  try {
    const data = productsList;
    return data;
  }
  catch (error) {
    console.error('Api Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
