import '@/app/ui/global.css';
import { roboto } from '@/app/ui/fonts'; // FIXME: Fonte 'proxima nova' disponivel apenas via Adobe CC

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
