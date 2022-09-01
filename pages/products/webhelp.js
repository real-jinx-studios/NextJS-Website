import Link from "next/link";
export default function Help() {
  return (
    <section aria-labelledby="help-title" className="container offset-top">
      <style jsx>{`
        .products,
        .title {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.8em;
        }
        .title {
          gap: 0.1em;
          margin-bottom: 2em;
        }
      `}</style>
      <div className="title">
        <header>
          <h1 id="youtube-title" className="section__title">
            Online documentation for our products.
          </h1>
        </header>
        <p>Select which product you need help with or something.</p>
      </div>
      <div className="products">
        <Link href="/Webhelp/EZTitles/index.html">
          <a className="button button_basic_long">EZTitles</a>
        </Link>
        <Link href="/Webhelp/EZConvert/index.html">
          <a className="button button_basic_long">EZConvert</a>
        </Link>
        <Link href="/Webhelp/3DTitles/index.html">
          <a className="button button_basic_long">3DTitles</a>
        </Link>
        <Link href="/Webhelp/EZTitles Plug-in for Adobe Premiere Pro/index.html">
          <a className="button button_basic_long">
            EZTitles plug-in for Adobe Premiere Pro
          </a>
        </Link>
        <Link href="/Webhelp/EZTitles Plug-in for Avid/index.html">
          <a className="button button_basic_long">EZTitles plug-in for Avid</a>
        </Link>
        <Link href="/Webhelp/EZTitles Plug-in for Cambria File Convert/index.html">
          <a className="button button_basic_long">
            EZTitles plug-in for Cambria File Convert
          </a>
        </Link>
        <Link href="/Webhelp/EZTitles Plug-in for ProMedia Carbon/index.html">
          <a className="button button_basic_long">
            EZTitles plug-in for ProMedia Carbon
          </a>
        </Link>
      </div>
    </section>
  );
}
