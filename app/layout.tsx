
'use client';

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Provider } from 'react-redux';
import { store } from '@/app/lib/redux/store';
import { use } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
