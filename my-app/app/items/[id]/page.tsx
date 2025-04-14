import { fetchProductDetail } from '@/app/lib/data';
import styles from './page.module.scss';
import Image from 'next/image';

type pageParams = {
   params: Promise<{ id: string }>
}

export default async function Page({ params }: pageParams) {
   const { id } = await params;
   const product = await fetchProductDetail(id);
   const breadcrumbs = product.category_path_from_root?.map((e: { name: string }) => e.name).join(' > ') || '';
   const condition = product.attributes?.find((e: { id: string }) => e.id === 'ITEM_CONDITION')?.value_name || '';
   
   return (
      <>
         <main className={styles.main}>
            <p className="breadcrumbs text-sm m-2">{breadcrumbs}</p>
            <div className="grid md:grid-cols-12 gap-4 p-6">
               <div className="max-h-16 max-w-16 border-2 border-blue-400 rounded overflow-hidden">
                  <Image src={product.picture} alt={product.title} width={60} height={60} /></div>
               <div className="md:col-span-4 flex justify-center md:justify-start">
                  <Image src={product.picture} alt={product.title} width={536} height={831} className="max-h-160 w-auto" /></div>
               <div className="md:col-span-7 pt-5">
                  <p className="mb-4 text-sm text-slate-400">{condition}</p>
                  <p className="mb-1 text-xl font-semibold">{product.title}</p>
                  {/* TODO: modelo de resposta exigido na Api não retorna esse dado: /* <p className="mb-8 text-lg text-slate-400">Por {product.seller?.nickname || product.seller_id}</p> */}
                  {product.price?.regular_amount && <del>$ {product.price?.regular_amount}</del>}
                  <p className="mb-4 text-4xl">$ {product.price?.amount}</p>
                  {product.installments && (
                     <p className="mb-3 text-sm text-emerald-500">Mesmo preço em {product.installments.quantity} parcelas</p> 
                  )}
                  {product.free_shipping && <p className="mb-6 font-semibold text-emerald-500">Envio grátis</p>}
                  <div className="mt-8">
                     {product.attributes.slice(0,3).map((e: {name: string, value_name: string}) => (
                        <p className="mb-3 text-slate-500">{e.name}: <b>{e.value_name}</b></p>
                     ))}
                  </div>
               </div>
            </div>
            <div className="grid gap-4 p-6">
               <hr />
               <p className="my-1 text-xl">Descrição</p>
               <p className="mb-2 text-lg text-slate-500">{product.description}</p>
            </div>
         </main>
      </>
   )
}