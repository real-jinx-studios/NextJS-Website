import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="/assets/fontawesome/css/all.css" rel="stylesheet" />
      </Head>
      <body style={{ margin: "0 !important" }}>
        <div id="modal-portal" />
        <div id="products-portal" />
        <div id="sidebar-portal" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
