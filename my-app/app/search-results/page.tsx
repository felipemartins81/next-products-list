import { lusitana } from '@/app/ui/fonts';
import { fechProducts } from '../lib/data';

export default async function SearchResults() {
   const products = await fechProducts();
   return (
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Listagem
        </h1>
        <ul>
          {products && products.results.splice(0,5).map((product) =>
            <li key={product.id} className="mb-4">
              <p className="text-lg">{product.title}</p>
            </li>
          )}
        </ul>
      </main>
    );
}