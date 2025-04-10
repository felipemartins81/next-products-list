import productsList from './json/search-MLA.json';
// import { formatCurrency } from './utils';

export async function fetchProducts() {
  try {
    const data = productsList;
    return data;
  }
  catch (error) {
    console.error('Api Error:', error);
    throw new Error('Failed to fetch products.');
  }
}

export async function fetchProductDetail(id: string) {
  try {
    const product = await require(`./json/item-${id}.json`);
    const description = await require(`./json/item-${id}-description.json`);
    const categories = await require(`./json/item-${id}-category.json`);
    product.description = description.plain_text || 'Nenhuma descrição disponível para este produto ;(';
    product.breadcrumbs = categories.path_from_root.map((e: { name: string }) => e.name).join(' > ');
    return product;
  }
  catch (error) {
    console.error('Api Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
