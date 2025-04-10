import { fetchProductDetail } from '@/app/lib/data';
import styles from './page.module.scss';
import Image from 'next/image';

type pageParams = {
   params: Promise<{ id: string }>
}

export default async function Page({ params }: pageParams) {
   const { id } = await params;

   const product = await fetchProductDetail(id);

   return (
      <>
         <main className={styles.main}>
            <p className="breadcrumbs text-sm">{product.breadcrumbs}</p>
            <div className="grid md:grid-cols-9 gap-4">
               <div className="max-h-16 max-w-16 md:max-h-fit md:max-w-fit">
                  <Image src={product.thumbnail} alt={product.title} width={259} height={250} className="rounded-md" /></div>
               <div className="md:col-span-4">
                  <Image src={product.pictures[0].url} alt={product.title} width={536} height={831} className="rounded-md" /></div>
               <div className="md:col-span-4">
                  <p className="mb-2">{product.condition == 'new' ? 'Novo' : 'Usado'}</p>
                  <p className="mb-2">{product.title}</p>
                  <p className="mb-6">Por {product.seller?.nickname}</p>
                  {product.original_price && <p className={styles.lineThrough}>$ {product.original_price}</p>}
                  <p className="mb-6">$ {product.price}</p>
                  {/* TODO: add promotions */}
                  {/* TODO: add 'mesmo preço em...' */}
                  {product.shipping?.free_shipping && <p className="mb-6">Envio grátis</p>}
                  {product.attributes.slice(0,3).map((e: {name: string, value_name: string}) => (
                     <p className="mb-6">{e.name}: {e.value_name}</p>
                  ))}
               </div>
            </div>
            <div className="grid gap-4">
               <div>
                  <p className="mb-2">Descrição</p>
                  <p className="mb-2">{product.description}</p>
               </div>
            </div>
         </main>
      </>
   )
}