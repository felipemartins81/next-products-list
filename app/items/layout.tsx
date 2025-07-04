import { Suspense } from "react";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex-grow p-6 md:overflow-y-auto md:p-8">
        <Suspense fallback={<p className="text-center">Carregando...</p>}>
          {children}
        </Suspense>
      </div>
    </div>
  );
}