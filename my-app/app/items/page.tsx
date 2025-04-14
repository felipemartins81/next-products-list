import Image from 'next/image';
import { fetchProducts } from '../lib/data';
import styles from './items.module.scss';
import Pagination from "@/app/ui/pagination";
import Link from 'next/link';
import { Suspense } from 'react';

type pageProps = {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

type productType = {
  id: string;
  title: string;
  picture: string;
  price: {
     amount: number;
     currency: string;
     decimals: number;
     regular_amount?: number;
  };
  condition: string;
  free_shipping: boolean;
  installments: string;
}

export default async function SearchResults(props: pageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const products = await fetchProducts();
  const filteredProducts = query ? products?.items.filter((e: productType) => e.title.toLowerCase().includes(query.toLowerCase())) : products?.items;
  const listAmount = 2;
  const limit = listAmount * currentPage;
  const offset = (currentPage - 1) * listAmount;
  const totalPages = Math.ceil(filteredProducts.length / listAmount);

  return (
    <main className={styles.main}>
      <ul>
        {filteredProducts.slice(offset, limit).map((product: productType) =>
          <li key={product.id}>
            <Link href={`/items/${product.id}`} className="md:max-h-60">
              <div className="flex justify-center md:w-60 md:h-60 md:float-left md:mr-6">
                <Image src={product.picture} alt={product.title} width={259} height={250} className="md:w-auto"/>
              </div>
              <p className="mt-8 mb-6 text-xl text-slate-900 font-light">{product.title}</p>
              {/* // TODO: modelo de resposta exigido na Api não retorna esse dado: <p className="mb-6 text-sm text-slate-500">Por {product.seller?.nickname}</p> */}
              {product.price?.regular_amount && <del className='text-xs text-slate-500'>$ {product.price?.regular_amount}</del>}
              <p className="text-2xl">$ {product.price?.amount}</p>
              {product.installments && (
                <p className="text-sm text-emerald-500">Mesmo preço em {product.installments} parcelas</p> 
              )}
              {product.free_shipping && <p className="mt-6 text-sm font-semibold text-emerald-500">Envio grátis</p>}
              {product.condition != 'new' && <p className="mt-6">Usado</p>}
              <div className={styles.clear}></div>
            </Link>
          </li>
        )}
      </ul>
      {filteredProducts.length > 0 && <Suspense>
        <Pagination totalPages={totalPages} />
      </Suspense>}
    </main>
  );
}