import { Fragment, useState, useEffect } from "react";
import ReactDom from "react-dom";
import Link from "next/link";
export default function SidebarVariant({
  setSidebarVariantOpen,
  sidebarVariantOpen,
}) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(sidebarVariantOpen);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    if (!sidebarVariantOpen) {
      document.body.style.overflow = "";
      return null;
    }

    document.body.style.overflow = "hidden";
  }

  // a site navigation sidebar component that shows link to pages
  return mounted
    ? ReactDom.createPortal(
        <Fragment>
          <style jsx>{`
            .closed {
              display: none;
            }
            .sidebar_overlay {
              position: fixed;
              inset: 0px;
              overflow: hidden;

              z-index: 5;
            }

            .sidebar {
              position: relative;
              width: 100%;
              height: 100%;
              max-height: 100vh;
              margin: auto;
              overflow: scroll;
              display: grid;
              grid-template-columns: 108px 1fr;
              z-index: 6;

              visibility: inherit;
              background-color: var(--clr-neutral-750);
            }
            @media (min-width: 1441px) {
              .sidebar {
                grid-template-columns: 198px 1fr 287px;
              }
            }
            @media (min-width: 1280px) {
              .sidebar {
                grid-template-columns: calc(13.0556%) 1fr 291px;
              }
            }
            @media (min-width: 1024px) {
              .sidebar {
                grid-template-columns: calc(10.1563%) 1fr 240px;
              }
            }
            @media (min-width: 768px) {
              .sidebar {
                grid-template-columns: calc(10.6771%) 1fr 252px;
              }
            }
            .sidebar_close {
              position: absolute;
              top: 0;
              left: 0;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              transform-origin: center center;
              transform: translate(25%, 25%);

              z-index: 6;

              width: 50px;
              height: 50px;
            }
            .sidebar_close svg {
              transition: all 0.3s ease-in-out;
            }
            .sidebar_close:hover svg {
              stroke: var(--clr-warn);
            }
            .sidebar_content_underlay {
              position: fixed;
              inset: 0px;
              background-color: rgba(0, 0, 0, 0.3);
              z-index: 5;
            }
            .sidebar_side_menu {
              padding: 0px 0px 180px;
              border-left: 1px solid #288ee288;
              display: flex;
              flex-direction: column;
              position: relative;
              justify-content: flex-end;

              z-index: 7;

              flex-direction: column;
            }
            .sidebar_main_content {
              display: none;
              position: relative;
              z-index: 7;
            }
            @media (min-width: 1280px) {
              .sidebar_main_content {
                grid-template-columns: 56% 43%;
              }
            }
            @media (min-width: 1024px) {
              .sidebar_main_content {
                display: grid;
                grid-template-columns: 55% 45%;
                grid-template-rows: 60% 40%;
              }
            }
            @media (min-width: 768px) {
              .sidebar_main_content {
                display: grid;
                grid-template-rows: 60% 40%;
              }
            }

            .sidebar_main_content_eztitles {
              border-left: 1px solid rgb(60, 60, 60);
              padding-top: max(11.75vh, 44px);
            }

            .sidebar_main_content_ezconvert {
              border-left: 1px solid rgb(60, 60, 60);
              padding-top: max(11.75vh, 44px);
            }

            .eztitles-title h2 {
              font-size: 3.2rem;
              font-weight: 500;
              text-transform: uppercase;
              letter-spacing: 0.15rem;
              color: var(--clr-neutral-50);
              transform: translateX(-3rem);
              margin-bottom: 3rem;
            }
            .eztitles-ul {
              padding: 0px 24px;
              margin: 0;
            }
            .eztitles-li {
              display: flex;
              align-items: center;
              margin-bottom: 2rem;
              gap: 1.1rem;
            }
            .eztitles-section {
              display: flex;
              transition: all 0.3s ease-in-out;

              align-items: center;
              color: var(--clr-neutral-250);
              font-size: 0.9rem;
              line-height: 0.9;
            }
            .eztitles-section-name {
              font-size: 1.2rem;
              color: var(--clr-neutral-50);
            }

            .eztitles-li:hover .eztitles-section {
              color: var(--clr-neutral-100);
            }
            .sidebar_background {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;

              background: var(--clr-neutral-800)
                url("/images/parrot-img-white-opacity-05.svg") no-repeat 44% 36%;
            }
            .sidebar_content {
              position: absolute;

              width: 380px;
              top: var(--nav-height);
              right: 0;
              bottom: 0;
              translate: translate(-50%, -50%);
              transition: transform 0.3s ease-in-out;
            }
            .sidebar_inner {
              padding: 80px 16px 52px;
              display: flex;
              flex-direction: column;
            }
            .sidebar__list {
              padding: 0px 8px 0px 12px;
            }
            .sidebar__list-item {
              padding: 0.89em 0em;
            }
            .sidebar__link {
              display: inline-block;
              padding: 16px;
              font-size: 18px;
              line-height: 1;
              color: rgb(255, 255, 255);
              transition: all 0.3s ease-out 0s;
              position: relative;
            }
          `}</style>
          <div
            className={`sidebar_overlay ${
              sidebarVariantOpen ? "open" : "closed"
            }`}
          >
            <div className="sidebar">
              <div
                className="sidebar_content_underlay"
                onClick={() => setSidebarVariantOpen(false)}
              />

              <div className="sidebar_extra_content">
                <div className="sidebar_inner"></div>
              </div>
              <div className="sidebar_main_content">
                <div className="sidebar_main_content_eztitles">
                  <div className="eztitles-title">
                    <h2>EZTitles</h2>
                    <div>
                      <ul className="eztitles-ul">
                        <Link href="/subtitle#wycd">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 1</span>
                            <span className="eztitles-section-name underlined_link white">
                              What you can do
                            </span>
                          </li>
                        </Link>
                        <Link href="/subtitle#htdie">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 2</span>
                            <span className="eztitles-section-name underlined_link white">
                              How to do it easy
                            </span>
                          </li>
                        </Link>
                        <Link href="/subtitle#eq">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 3</span>
                            <span className="eztitles-section-name underlined_link white">
                              Ensure the quality
                            </span>
                          </li>
                        </Link>
                        <Link href="/subtitle#cp">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 4</span>

                            <span className="eztitles-section-name underlined_link white">
                              Complete and export
                            </span>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="sidebar_main_content_ezconvert">
                  <div className="eztitles-title">
                    <h2>EZConvert</h2>
                    <div>
                      <ul className="eztitles-ul">
                        <Link href="/conver#wycd">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 1</span>
                            <span className="eztitles-section-name underlined_link white">
                              Make it simple
                            </span>
                          </li>
                        </Link>
                        <Link href="/conver#htdie">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 2</span>
                            <span className="eztitles-section-name underlined_link white">
                              Convert profesionally
                            </span>
                          </li>
                        </Link>
                        <Link href="/conver#eq">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 3</span>
                            <span className="eztitles-section-name underlined_link white">
                              Save time and money
                            </span>
                          </li>
                        </Link>
                        <Link href="/conver#cp">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 4</span>

                            <span className="eztitles-section-name underlined_link white">
                              Automate
                            </span>
                          </li>
                        </Link>
                        <Link href="/conver#cp">
                          <li className="eztitles-li">
                            <span className="eztitles-section">section 5</span>

                            <span className="eztitles-section-name underlined_link white">
                              Premium offers
                            </span>
                          </li>
                        </Link>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sidebar_side_menu">
                <div
                  className="sidebar_close"
                  onClick={() => setSidebarVariantOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#fefefe"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"
                    />
                  </svg>
                </div>

                <div className="sidebar_inner">
                  <ul className="sidebar__list">
                    <li className="sidebar__list-item">
                      <Link href="/checkout">
                        <a className="underlined_link white">Go to checkout</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">Demos</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/free-trial?destination=products/free-trial">
                        <a className="underlined_link white">Free Trials</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">User Guides</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">Video Tutorials</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">Support</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">Help</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">Contact Us</a>
                      </Link>
                    </li>
                    <li className="sidebar__list-item">
                      <Link href="/products/help">
                        <a className="underlined_link white">Legal</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Fragment>,
        document.getElementById("sidebar-portal")
      )
    : null;
}
