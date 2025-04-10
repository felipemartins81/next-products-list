import Image from 'next/image';
import styles from "./header.module.scss";
import Search from "./search";

export default function Header() {
   return (
    <nav className={styles.header}>
       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-6">
          <div className="relative flex p-2 items-center justify-between">
             <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
               <div className="flex shrink-0 items-center">
                  <Image src={'/logo.png'} alt={'Mercado Libre logo'} width={134} height={34} className={styles.logo} />
               </div>
               <Search placeholder="Buscar produtos, marcas e mais..." />
             </div>
             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
               <button type="button" className={styles.searchButton}>
                  <span className="sr-only">Buscar</span>
                  <Image src={'/icon-search.png'} alt={'Mercado Libre logo'} width={20} height={20} />
               </button>
             </div>
          </div>
       </div>
      </nav>
   )
 }
