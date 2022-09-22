import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
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
