'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebouncedCallback } from 'use-debounce';

export default function ({ placeholder }: { placeholder: string }) {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const handleSearch = useDebouncedCallback((term: string) => {
      console.log("👀 ~ term:", term)
      const params = new URLSearchParams(searchParams || '');
      params.set('page', '1');
      term ? params.set('query', term) : params.delete('query');
      replace(`/items?${params.toString()}`);
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
               handleSearch(e.target.value)
            }}
         />
         <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
   );
}
