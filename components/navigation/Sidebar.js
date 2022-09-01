import { Fragment, useState, useEffect, useRef } from "react";
import ReactDom from "react-dom";
import Link from "next/link";
export default function Sidebar({ setSidebarOpen, sidebarOpen }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(sidebarOpen);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const sidebar_overlay = useRef();
  const section = useRef();

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (sidebarOpen) {
        setIsOpen(true);
        setTimeout(() => {
          setIsSectionOpen(true);
        }, 30);
      } else {
        setIsSectionOpen(false);
        setTimeout(() => {
          setIsOpen(false);
        }, 500);
      }
    }
  }, [sidebarOpen]);

  if (mounted) {
    if (!sidebarOpen) {
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
            .sidebar_overlay {
              display: none;
              position: fixed;
              inset: 0px;

              z-index: 5;
            }
            .sidebar_overlay.open {
              display: block;
            }

            .sidebar {
              position: absolute;
              inset: 50% auto auto 50%;
              border: 0px none;

              overflow: hidden;
              border-radius: 0px;
              outline: currentcolor none medium;
              padding: 0.5vh 0.5vw;
              opacity: 1;
              width: 101vw;
              height: 101vh;

              transform: translate(-50%, -50%);
              z-index: 6;
              visibility: inherit;
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
              transform: rotate(90deg);
              stroke: var(--clr-warn);
            }
            .sidebar_content_underlay {
              position: fixed;
              inset: 0px;
              background-color: rgba(0, 0, 0, 0.3);
              z-index: 5;
            }
            .sidebar_content {
              justify-content: flex-end;

              padding: 144px 0px 52px;
              border-left: 4px solid #288ee248;
              transition: all 0.3s ease-in-out;

              position: relative;
              width: 100%;
              height: 100%;
              z-index: 7;

              flex-direction: column;
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
              right: -380px;
              bottom: 0;
              translate: translate(-50%, 0);
              transition: transform 0.3s ease-in-out;
            }
            .sidebar_content.open {
              right: 0;
              transition: all 0.3s;
            }
            .sidebar_inner {
              border-left: 1px solid rgb(60, 60, 60);
              padding: 80px 16px 52px;
              display: flex;
              flex-direction: column;
            }
            .sidebar__list {
              padding: 0px 8px 0px 12px;
              overflow: hidden;
            }
            .sidebar__list-item {
              padding: 0.89em 0em;
            }
            .sidebar__list-item.open {
              opacity: 0;
              transform: translateX(100%);
              animation: fadeInSlideIn 0.2s ease-in-out
                calc(var(--animation-order) * 25ms);
              animation-fill-mode: forwards;
            }
            @keyframes fadeInSlideIn {
              0% {
                opacity: 0;
                transform: translateX(100%);
              }
              100% {
                opacity: 1;
                transform: translateX(0);
              }
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
            className={`sidebar_overlay ${isOpen ? "open" : ""}`}
            ref={sidebar_overlay}
          >
            <div className="sidebar">
              <div
                className="sidebar_content_underlay"
                onClick={() => setSidebarOpen(false)}
              />
              <div
                className={`sidebar_content ${isSectionOpen ? "open" : ""}`}
                ref={section}
              >
                <div
                  className="sidebar_close"
                  onClick={() => setSidebarOpen(false)}
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
                <div className="sidebar_background"></div>
                <div className="sidebar_inner">
                  <ul className="sidebar__list">
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "1" }}
                    >
                      <Link href="/checkout">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Go to checkout
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "2" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Demos
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "3" }}
                    >
                      <Link href="/products/free-trial?destination=products/free-trial">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Free Trials
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "4" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          User Guides
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "5" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Video Tutorials
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "6" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Support
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "7" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Help
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "8" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Contact Us
                        </a>
                      </Link>
                    </li>
                    <li
                      className={`sidebar__list-item ${
                        isSectionOpen ? "open" : ""
                      }`}
                      style={{ "--animation-order": "9" }}
                    >
                      <Link href="/products/help">
                        <a
                          onClick={() => setSidebarOpen(false)}
                          className="underlined_link white"
                        >
                          Legal
                        </a>
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
