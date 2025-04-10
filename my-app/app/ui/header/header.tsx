import Image from 'next/image';
import styles from "./header.module.scss";
import Search from "./search";
import Link from 'next/link';

export default function Header() {
   return (
    <nav className={styles.header}>
       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
          <div className="relative flex p-2 items-center justify-between">
             <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
               <Link href="/items" className="flex flex-shrink-0 items-center">
                  <Image src={'/logo.png'} alt={'Mercado Libre logo'} width={134} height={34} className={styles.logo} />
               </Link>
               <Search placeholder="Buscar produtos, marcas e mais..." />
             </div>
          </div>
       </div>
      </nav>
   )
 }
