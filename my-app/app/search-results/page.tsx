import Image from 'next/image';
import { fechProducts } from '../lib/data';
import styles from './search-result.module.scss';

export default async function SearchResults() {
   const products = await fechProducts();
   console.log("👀 ~ products:", products.results[1]) // products.results.find(e => e.promotions))
   return (
      <main className={styles.main}>
        <ul>
          {products && products.results.splice(0,5).map((product) =>
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
      </main>
    );
}