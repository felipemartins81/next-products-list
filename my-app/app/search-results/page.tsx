import Image from 'next/image';
import { fechProducts } from '../lib/data';
import styles from './search-result.module.scss';
import Pagination from "@/app/ui/pagination";

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
   const products = await fechProducts();
   const filteredProducts = query ? products?.results.filter(e => e.title.includes(query)) : products?.results;
   const listAmount = 2;
   const limit = listAmount * currentPage;
   const offset = (currentPage - 1) * listAmount;
   const totalPages = Math.ceil(filteredProducts.length / listAmount);

   return (
      <main className={styles.main}>
        <ul>
          {filteredProducts.slice(offset, limit).map((product) =>
            <li key={product.id}>
              <Image src={product.thumbnail} alt={product.title} width={259} height={250} className="rounded-md" />
              <p className="mb-2">{product.title}</p>
              <p className="mb-6">Por {product.seller?.nickname}</p>
              {product.original_price && <p className={styles.lineThrough}>$ {product.original_price}</p>}                
              <p className="mb-6">$ {product.price}</p>
              {/* TODO: add promotions */}
              {/* TODO: add 'mesmo preço em...' */}
              {product.shipping?.free_shipping && <p className="mb-6">Envio grátis</p>}
              {product.condition != 'new' && <p className="mb-6">Recondicionado</p>}
              <div className={styles.clear}></div>
            </li>
          )}
        </ul>
        <Pagination totalPages={totalPages} />
      </main>
    );
}