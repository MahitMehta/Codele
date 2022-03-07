import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

export default class RootDocument extends Document {
    static async getInitialProps(ctx:DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
          <Html className='dark' lang="en">
            <Head key="document"></Head>
            <body className="bg-white dark:bg-slate-900">
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }
}