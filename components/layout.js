import Head from "next/head";
import { Fragment, useContext } from "react";

const name = "Jinx Studios";
export const siteTitle = "EZTitles Dev Studio";

export default function Layout({ children, home, title, description }) {
  return (
    <Fragment>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={title || "EZTitles"} />
        <meta
          name="description"
          content={
            description || "professional subtitling and conversion software"
          }
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle || "EZTitles"} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main>{children}</main>
    </Fragment>
  );
}
