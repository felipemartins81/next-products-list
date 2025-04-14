import productsList from './json/search-MLA.json';

export async function fetchProducts() {
  try {
    const data = await fetch('http://localhost:4000/api/items');
    const products = await data.json();
    return products;
  } catch (error) {
    console.error('Api Error:', error);
    throw new Error('Failed to fetch products.'); 
  }
}

export async function fetchProductDetail(id: string) {
  try {
    const data = await fetch(`http://localhost:4000/api/items/${id}`);	
    const product = await data.json();
    return product;
  }
  catch (error) {
    console.error('Api Error:', error);
    throw new Error('Failed to fetch products.');
  }
}
