'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';
import styles from "./header.module.scss";

export default function ({ placeholder }: { placeholder: string }) {
   const [isSearching, setIsSearching] = useState(false);
   const searchParams = useSearchParams();
   const { replace } = useRouter();

   const handleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams || '');
      params.set('page', '1');
      term ? params.set('query', term) : params.delete('query');
      replace(`/items?${params.toString()}`);
      setTimeout(() => {
         setIsSearching(false)
      }, 2000);
   }, 500);

   return (
      <div className="relative flex flex-1 flex-shrink-0">
         <label htmlFor="search" className="sr-only">
            Search
         </label>
         <input
            className="peer block w-full rounded-md border border-gray-200 py-[9px] text-sm outline-2 placeholder:text-gray-500"
            placeholder={placeholder}
            defaultValue={searchParams?.get('query')?.toString()}
            onChange={(e) => {
               setIsSearching(true);
               handleSearch(e.target.value)
            }}
         />
         {isSearching ? <ArrowPathIcon className={styles.loader} /> : <MagnifyingGlassIcon className="hidden md:inline-flex absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />}
      </div>
   );
}
