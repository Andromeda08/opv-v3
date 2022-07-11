import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '../contexts/ThemeContext'
import { StateProvider } from '@Contexts/StateContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <StateProvider>
        <Component {...pageProps} />
      </StateProvider>
    </ThemeProvider>
  )
}

export default MyApp
