import '../styles/globals.scss';

import type { AppProps } from 'next/app';
import { ThemeProvider } from '@Contexts/ThemeContext';
import { StateProvider } from '@Contexts/StateContext';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ThemeProvider>
      <StateProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </StateProvider>
    </ThemeProvider>
  )
}

export default MyApp
