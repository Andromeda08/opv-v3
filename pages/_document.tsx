import Document, {
  DocumentContext, 
  Html, 
  Head, 
  Main, 
  NextScript 
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#f472b6" />
          <meta name="description" content="osu! profile viewer" />
          <meta name="keywords" content="osu osu! osu!game osugame player profile viewer"/>

          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://osu.tsukiakari.hu/' />
          <meta property='og:title' content='osu!pv' />
          <meta property='og:description' content='View your and other players osu! profiles.' />
          <meta property='og:image' content='/icon.png' />
          <meta property="og:image:width" content="64" />
          <meta property="og:image:height" content="64" />

          <link rel="canonical" href="https://osu.tsukiakari.hu" />

          <link rel="shortcut icon" href="/icon.png"  type="image/png" />
          <link rel="apple-touch-icon" href="/icon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;