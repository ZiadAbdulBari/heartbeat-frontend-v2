import { Html, Head, Main, NextScript } from "next/document";
// import { Raleway } from 'next/font/google';
export default function Document() {
  // const raleway = Raleway()
  return (
    <Html lang="en">
      <Head>
        <title>Heartbeat</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <body>
        <Main/>
        <NextScript />
      </body>
    </Html>
  );
}
