import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class appDocument extends Document {
  render() {
    return (
      <Html lang="es-CO">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
