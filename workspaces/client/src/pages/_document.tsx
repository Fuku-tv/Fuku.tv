import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="0" />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0 ,maximum-scale=1.0,user-scalable=0" />

          <meta
            name="description"
            content="We're an online arcade! Play your favorite claw machines and arcade games from the comfort of your home."
          />

          <meta property="og:url" content="https://fuku.tv" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Fuku.tv" />
          <meta
            property="og:description"
            content="We're an online arcade! Play your favorite claw machines and arcade games from the comfort of your home."
          />
          <meta property="og:image" content="http://drive.google.com/uc?export=view&id=1lSIx3P9SfoKbgMIjBkao70a0aViXtojm" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="fuku.tv" />
          <meta property="twitter:url" content="https://fuku.tv" />
          <meta name="twitter:title" content="Fuku.tv" />
          <meta
            name="twitter:description"
            content="We're an online arcade! Play your favorite claw machines and arcade games from the comfort of your home."
          />
          <meta name="twitter:image" content="http://drive.google.com/uc?export=view&id=1lSIx3P9SfoKbgMIjBkao70a0aViXtojm" />

          <link rel="shortcut icon" href="fuku.png" />
          <title>Fuku.tv</title>
        </Head>
        <body>
          <div id="backdrop-hook" />
          <div id="drawer-hook" />
          <div id="modal-hook" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
