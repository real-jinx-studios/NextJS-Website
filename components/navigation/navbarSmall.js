import { useState, useEffect, Ref, useRef } from "react";
import styles from "./navbarSmall.module.css";
import Link from "next/link";
import MyImage from "../utils/myImage";
import cn from "classnames";
import { useRouter } from "next/router";
import BurburMenu from "./burbur_menu";

export default function NavbarSmall() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const sticky = 80;
  const catchScroll = () => {
    if (window.scrollY > sticky) {
      setScroll(true);
    } else if (window.scrollY <= sticky) {
      setScroll(false);
    }
  };

  const nav_btn = useRef();
  const primary_nav = useRef();

  const handleBorgerClick = (e) => {
    const vis = primary_nav.current.getAttribute("data-visible");

    if (vis === "false") {
      primary_nav.current.setAttribute("data-visible", "true");
      nav_btn.current.setAttribute("aria-expanded", "true");
    } else {
      primary_nav.current.setAttribute("data-visible", "false");
      nav_btn.current.setAttribute("aria-expanded", "false");
    }
  };
  const handleBurbur = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (open) {
      document.querySelector("body").classList.add("disable_scroll");
    } else {
      document.querySelector("body").classList.remove("disable_scroll");
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  return (
    <nav className="nav-mobile" role="navigation">
      <style jsx>{`
        .nav-links-wrapper {
          padding: 0;
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .nav-mobile {
          position: relative;
        }
        .nav-links {
          z-index: 80;
          list-style: none;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0;
          position: relative;
          position: absolute;
          z-index: 5;
          top: 0;
          left: 0;
          width: 100%;
          height: 48px;
          overflow: hidden;
          justify-content: space-between;
        }
        .bm_memu_wrapper {
          height: calc(12px);
          width: 2em;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          position: relative;
        }

        .bm_menu {
          position: relative;
          height: 2px;
          width: 1.8em;
          background-color: var(--clr-neutral-50);
          border-radius: 25px;
          transition: all 0.25s;
        }

        .bm_menu::before,
        .bm_menu::after {
          position: absolute;
          content: "";
          height: 3px;
          width: 1.8em;
          left: 0;
          right: 0;
          background-color: var(--clr-neutral-50);
          border-radius: 25px;
          transition: all 0.25s;
          transition: all 0.42s ease-in-out;
        }
        .bm_menu::before {
          top: -0.35em;
        }
        .bm_memu_wrapper:hover .bm_menu::before {
          transform-origin: left;
          transform: scaleX(0.6);
        }
        .bm_memu_wrapper:hover .bm_menu::after {
          transform-origin: right;
          transform: scaleX(0.3);
        }
        .bm_menu::after {
          bottom: -0.35em;
        }
        .bm_menu.open,
        .bm_menu.open::before,
        .bm_menu.open::after {
          background-color: var(--clr-neutral-800);
        }
        .bm_menu.open::after {
          transform-origin: 0;
          transform: translateX(50%) translateY(-650%) rotate(90deg) scaleX(1);
        }
        .bm_menu.open,
        .bm_menu.open::before {
          transform: rotate(45deg);
        }
        .bm_menu.open::before {
          transition: all 0.3s var(--cubic-bezier);

          transform: translateX(50%) translateY(650%) rotate(45deg) scaleX(0.25);
        }
      `}</style>
      <div className="nav-links-wrapper">
        <ul className="nav-links">
          <li>
            <div className="bm_memu_wrapper" onClick={handleBurbur}>
              <div className="bm_menu" />
            </div>
          </li>
          <li>
            <img
              src="/images/ezlogo.png"
              width={100}
              height={50}
              alt="EZTitles"
            />
          </li>
          <li>search</li>
        </ul>
        <BurburMenu mobile={true} open={open} />
      </div>
    </nav>
  );
}
