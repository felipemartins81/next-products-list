import '@/app/ui/global.css';
import { lusitana  } from '@/app/ui/fonts'; // FIXME: Fonte 'proxima nova' disponivel apenas via Adobe CC

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${lusitana .className} antialiased`}>{children}</body>
    </html>
  );
}
