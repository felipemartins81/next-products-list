import '@/app/ui/global.css';
import { roboto } from '@/app/ui/fonts'; // FIXME: Fonte 'proxima nova' disponivel apenas via Adobe CC
import Header from './ui/header/header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
