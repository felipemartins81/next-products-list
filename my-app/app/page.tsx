import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from "./page.module.scss";

export default async function Page() {
  const data = await fetch('http://localhost:4000/api/user');
  const user = await data.json();

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className={styles.main + " grid md:grid-cols-3 gap-4"}>
        <div className="flex justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            {user?.first_name && <>
              Olá <i>{user?.first_name} {user?.last_name}</i>.{' '}
            </>} <br />{' '}
            <strong>Seja bem vindo</strong> a busca de produtos ;){' '}
          </p>
        </div>
        <div className="md:col-span-2 md:pl-6 pt-6">
          Separamos alguns termos mais buscados para você começar:
          <div className="md:flex gap-4 pt-6">
            <Link
              href="/items?query=iphone"
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 text-gray-800 transition-colors hover:bg-gray-200"
            >
              Iphone{' '}
              <ArrowRightIcon className="h-6 w-6 text-gray-400 ml-3" />
            </Link>
            <Link
              href="/items?query=camisa"
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 text-gray-800 transition-colors hover:bg-gray-200"
            >
              Camisas{' '}
              <ArrowRightIcon className="h-6 w-6 text-gray-400 ml-3" />
            </Link>
            <Link
              href="/items?query=zapatilla"
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 text-gray-800 transition-colors hover:bg-gray-200"
            >
              Calçados{' '}
              <ArrowRightIcon className="h-6 w-6 text-gray-400 ml-3" />
            </Link>
            <Link
              href="/items?query=café"
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 text-gray-800 transition-colors hover:bg-gray-200"
            >
              Café{' '}
              <ArrowRightIcon className="h-6 w-6 text-gray-400 ml-3" />
            </Link>
            <Link
              href="/items?query=arroz"
              className="flex items-center justify-between rounded-lg bg-gray-100 p-4 text-gray-800 transition-colors hover:bg-gray-200"
            >
              Arroz{' '}
              <ArrowRightIcon className="h-6 w-6 text-gray-400 ml-3" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
