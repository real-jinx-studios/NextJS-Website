import Head from "next/head";

export default function Metatags({
  title = "EZTitles - Subtitles and conversion tools",
  description = "Professional subtitling and conversion tools",
  image = "https://eztitles.com/static/images/logo.png",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@eztitles" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta property="og:title" content={title} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
    </Head>
  );
}
