import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function BurburMenu({ open, mobile, setOpen }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isRouterReady, setIsRouterReady] = useState(false);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  useEffect(() => {
    if (Cookies.get("cartId")) {
      setIsCartLoaded(true);
    }
  }, []);
  const handleMobileShowMoreClick = () => {
    setIsMoreOpen(!isMoreOpen);
  };
  const router = useRouter();
  useEffect(() => {
    if (router.isReady) {
      setIsRouterReady(router.asPath);
    }
  }, [router.isReady]);
  useEffect(() => {
    if (typeof setOpen === "function") setOpen(false);
  }, [router.asPath]);

  if (!mobile) {
    return (
      <div className={open ? "burbur-menu open" : "burbur-menu"}>
        <style jsx>{`
          .burbur-menu {
            width: 320px;
            /*full screen*/
            /*width: 100%;*/
            position: absolute;
            overflow-x: hidden;
            top: 0;
            height: 100vh;
            background-color: #fefefeee;
            transform: translateX(100vw);
            transition: transform 0.38s ease-in-out;
            z-index: -1;
            display: grid;
            align-items: center;
            background: #fefefefe url("/images/parrot-img-opacity-05.svg")
              no-repeat 44% 36%;
          }
          .burbur-menu.open {
            visibility: visible;
            transform: translateX(calc(100vw - 320px));
            /*full screen*/
            /*transform: translateX(0);*/
          }
          .burbur-inner {
            margin: 0 auto;
          }
          .burbur-ul {
            list-style: none;
          }
          .burbur-li {
            color: var(--clr-neutral-800);
            margin-bottom: 1.5em;
            padding: 0.3em 1.6em;
            cursor: pointer;
          }
          .burbur-link {
            padding-bottom: 0.1em;
            color: var(--clr-neutral-800);
          }
          .burbur-link {
            position: relative;
            color: var(--clr-neutral-800);
          }
          .burbur-link::before {
            content: "";
            position: absolute;
            left: 0;
            right: 89%;
            top: 91%;
            bottom: 0;
            transition: all 0.3s var(--cubic-bezier);
            background-color: var(--clr-neutral-800);
          }
          .burbur-li:hover .burbur-link::before {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            top: 91%;
            bottom: 0;
            background-color: var(--clr-neutral-800);
          }
          .cart-not-loaded {
            padding: 0.3em 1.6em;
            color: var(--clr-neutral-50);
            background-color: var(--clr-neutral-800);
          }
          .cart-loaded {
            padding: 0.3em 1.6em;
            color: var(--clr-neutral-50);
            background-color: var(--clr-correct);
          }
        `}</style>
        <div className="burbur-inner">
          <ul className="burbur-ul">
            <li className="burbur-li">
              <Link href="/checkout">
                <a className="burbur-link">Go to checkout</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">Demos</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/free-trial?destination=products/free-trial">
                <a className="burbur-link">Free Trials</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">User Guides</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">Video Tutorials</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">Support</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">Help</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">Contact Us</a>
              </Link>
            </li>
            <li className="burbur-li">
              <Link href="/products/help">
                <a className="burbur-link">Legal</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={open ? "burbur-menu open" : "burbur-menu"}>
      <style jsx>{`
        .burbur-menu {
          width: 100%;
          position: fixed;
          overflow-x: hidden;
          top: 0;
          height: 100vh;
          background-color: #fefefeee;
          transform: translateX(100vw);
          transition: transform 0.38s ease-in-out;
          z-index: 1;
          display: grid;
          align-items: center;

          background: #fefefefe url("/images/parrot-img-opacity-05.svg")
            no-repeat 44% 36%;
        }
        .burbur-menu.open {
          visibility: visible;
          transform: translateX(0);
        }
        .burbur-inner {
          margin: 0 auto;
        }
        .burbur-ul {
          list-style: none;
        }
        .burbur-li {
          color: var(--clr-neutral-800);
          margin-bottom: 1.5em;
          padding: 0.3em 1.6em;
          cursor: pointer;
        }
        .burbur-link {
          padding-bottom: 0.1em;
          color: var(--clr-neutral-800);
        }
        .burbur-link {
          position: relative;
          color: var(--clr-neutral-800);
        }
        .burbur-link::before {
          content: "";
          position: absolute;
          left: 0;
          right: 89%;
          top: 96%;
          bottom: 0;
          transition: all 0.3s var(--cubic-bezier);
          background-color: var(--clr-neutral-800);
        }
        .burbur-li:hover .burbur-link::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 96%;
          bottom: 0;
          background-color: var(--clr-neutral-800);
        }
        .more-menu_wrapper {
          overflow: hidden;
          height: 0;
          transition: all 0.25s var(--cubic-bezier);
        }
        .more-menu_wrapper.open {
          height: 500px;
        }
        .burbur-more {
          text-align: center;
          cursor: pointer;
          color: var(--clr-neutral-800);
        }
        .burbur-more::after {
        }
      `}</style>
      <div className="burbur-inner">
        <ul className="burbur-ul">
          <li className="burbur-li">
            <Link href="/subtitle">
              <a className="burbur-link">Subtitle</a>
            </Link>
          </li>
          <li className="burbur-li">
            <Link href="/products/free-trial?destination=products/free-trial">
              <a className="burbur-link">Convert</a>
            </Link>
          </li>
          <li className="burbur-li">
            <Link href="/products/help">
              <a className="burbur-link">Subtitling Assistant</a>
            </Link>
          </li>
          <li className="burbur-li">
            <Link href="/products/help">
              <a className="burbur-link">Burn-in</a>
            </Link>
          </li>
          <li className="burbur-li">
            <Link href="/products/help">
              <a className="burbur-link">Login</a>
            </Link>
          </li>
          <li className="burbur-li">
            <a className="burbur-more" onClick={handleMobileShowMoreClick}>
              More
            </a>
            <div
              className={
                isMoreOpen ? "more-menu_wrapper open" : "more-menu_wrapper"
              }
            >
              <ul className="more-menu_links">
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">Demos</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/free-trial?destination=products/free-trial">
                    <a className="burbur-link">Free Trials</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">User Guides</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">Video Tutorials</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">Support</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">Help</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">Contact Us</a>
                  </Link>
                </li>
                <li className="burbur-li">
                  <Link href="/products/help">
                    <a className="burbur-link">Legal</a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
