import Image from 'next/image';
import { fetchProducts } from '../lib/data';
import styles from './items.module.scss';
import Pagination from "@/app/ui/pagination";
import Link from 'next/link';

type pageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function SearchResults(props: pageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const products = await fetchProducts();
  const filteredProducts = query ? products?.results.filter(e => e.title.toLowerCase().includes(query.toLowerCase())) : products?.results;
  const listAmount = 2;
  const limit = listAmount * currentPage;
  const offset = (currentPage - 1) * listAmount;
  const totalPages = Math.ceil(filteredProducts.length / listAmount);

  return (
    <main className={styles.main}>
      <ul>
        {filteredProducts.slice(offset, limit).map((product) =>
          <li key={product.id}>
            <Link href={`/items/${product.id}`} className="md:max-h-60">
              <div className="flex justify-center md:w-60 md:h-60 md:float-left md:mr-6">
                <Image src={product.thumbnail} alt={product.title} width={259} height={250} className="md:w-auto"/>
              </div>
              <p className="mt-8 mb-1 text-xl text-slate-900 font-light">{product.title}</p>
              <p className="mb-6 text-sm text-slate-500">Por {product.seller?.nickname}</p>
              {product.original_price && <del className='text-xs text-slate-500'>$ {product.original_price}</del>}
              <p className="text-2xl">$ {product.price}</p>
              {product.installments && product.installments.quantity > 1 && (
                <p className="text-sm text-emerald-500">Mesmo preço em {product.installments.quantity} parcelas de $ {product.installments.amount}</p> 
              )}
              {product.shipping?.free_shipping && <p className="mt-6 text-sm font-semibold text-emerald-500">Envio grátis</p>}
              {product.condition != 'new' && <p className="mt-6">Recondicionado</p>}
              <div className={styles.clear}></div>
            </Link>
          </li>
        )}
      </ul>
      {filteredProducts.length > 0 && <Pagination totalPages={totalPages} />}
    </main>
  );
}