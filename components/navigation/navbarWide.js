import { useState, useEffect } from "react";

import Link from "next/link";
import cn from "classnames";
import Confetti from "react-confetti";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import styles from "./navbar2.module.css";
import BurburMenu from "./burbur_menu";
import ProductsModal from "../modal/ProductsModal";

import GenericModal from "../modal/GenericModal";
import AddSpecificProductToCartModal from "../modal/AddSpecificProductToCartModal";

import ServicesPortalNavItem from "./ServicesPortalNavItem";
export default function NavbarWide({
  navbarRef,
  setSidebarOpen,
  setSidebarVariantOpen,
}) {
  const [confetti, setConfetti] = useState(false);
  const [
    isAddSpecificProductToCartModalOpen,
    setIsAddSpecificProductToCartModalOpen,
  ] = useState(false);

  const [currentRoute, setCurrentRoute] = useState(null);

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  //trigger useEffect every time the browser url changes

  const [scroll, setScroll] = useState(false);
  const sticky = 80;
  const catchScroll = (e) => {
    if (window.scrollY > sticky) {
      setScroll(true);
    } else if (window.scrollY <= sticky) {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.onscroll = function (e) {
      catchScroll(e);
    };
  }, []);

  useEffect(() => {
    setCurrentRoute(router.pathname);
  }, [router.pathname]);

  const burnState = (e) => {
    e.preventDefault();

    Cookies.remove("uat");
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    //delete all session stroage
    sessionStorage.clear();
    //delete all local storage
    localStorage.clear();

    //router.reload();
  };
  const handleCheckoutClick = () => {
    router.replace("/checkout");
  };

  return (
    <nav
      ref={navbarRef}
      className={`${styles.navbar_wrapper} ${scroll && styles.scroll}`}
      role="navigation"
      aria-label="Primary"
    >
      <div className={styles.navbar_inner}>
        <ul className={`${styles.nav_ul_left}`}>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/subtitle">
              <a className={styles.nav_link_a}>Subtitle</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/convert">
              <a className={styles.nav_link_a}>Convert</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/subtitling-assistant">
              <a className={styles.nav_link_a}>Subtitling Assistant</a>
            </Link>
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <Link href="/burn-in">
              <a className={styles.nav_link_a}>Burn-in</a>
            </Link>
          </li>
        </ul>

        <div className={styles.nav_sec_center}>
          <div
            className={cn({
              [router.pathname !== "/"
                ? styles.nav_icon_wrapper
                : styles.nav_icon_wrapper_home]: scroll === false,
              [styles.nav_icon_wrapper_scroll]: scroll === true,
            })}
          >
            <Link href="/#">
              <a>
                <img
                  src="/images/ezlogo.png"
                  width={100}
                  height={50}
                  alt="EZTitles"
                />
              </a>
            </Link>
          </div>
        </div>
        <ul className={styles.nav_ul_right}>
          {
            <>
              <style jsx>{`
                .li-button-expandable {
                  position: relative;
                  list-style: none;
                  width: 42px;
                  height: 42px;
                  background-color: #fff;
                  border-radius: 60px;
                  cursor: pointer;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  transition: 0.5s;
                  box-shadow: 0 9px 25px rgba(0, 0, 0, 0.1);
                }
                .li-button-expandable:hover {
                  width: 180px;
                  box-shadow: 0 9px 25px rgba(0, 0, 0, 0);
                }
                .li-button-expandable::before {
                  content: "";
                  position: absolute;
                  inset: 0;
                  border-radius: 60px;
                  background: linear-gradient(45deg, var(--i), var(--j));
                  opacity: 0;
                  transition: 0.5s;
                }
                .li-button-expandable:hover::before {
                  opacity: 1;
                }
                .li-button-expandable::after {
                  content: "";
                  position: absolute;
                  top: 9px;
                  width: 100%;
                  height: 100%;
                  border-radius: 60px;
                  background: linear-gradient(45deg, var(--i), var(--j));
                  transition: 0.42s;
                  filter: blur(15px);
                  opacity: 0;
                  z-index: -1;
                }
                .li-button-expandable:hover::after {
                  opacity: 0.8;
                }
                .li-button-expandable span {
                  position: absolute;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                .svg-icon {
                  width: 1.75em;
                  height: 1.75em;
                  margin: 0;
                  padding: 0;
                  stroke: var(--clr-warn);
                  transition: 0.42s;
                  transition-delay: 0.25s;
                }

                .checkout {
                  stroke: #ffd475;
                }
                .celebrate {
                  stroke: #f88dad;
                }
                .nav-button-action {
                  color: var(--clr-neutral-50);
                  font-size: 1.1em;
                  font-weight: 500;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                  transform: scale(0);
                  transition: 0.42s;
                  transition-delay: 0s;
                }
                .li-button-expandable:hover .svg-icon {
                  transform: scale(0);
                  stroke: var(--clr-neutral-50);
                  transition-delay: 0s;
                }
                .li-button-expandable:hover .nav-button-action {
                  transform: scale(1);
                  transition-delay: 0.25s;
                }
                .li-button-expandable > * {
                  user-select: none;
                  pointer-events: none;
                }
              `}</style>
              <li
                className="li-button-expandable"
                style={{ "--i": "#ffd475", "--j": "#ffb69c" }}
                onClick={handleCheckoutClick}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon checkout"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action">Checkout</span>
              </li>

              <li
                className="li-button-expandable"
                style={{ "--i": "#f88dad", "--j": "#726dc3" }}
                onClick={() => setConfetti(!confetti)}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon celebrate"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action">
                  {!confetti ? "Celebrate" : "stop it!"}
                </span>
              </li>
            </>
          }
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <ServicesPortalNavItem />
          </li>
          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <div
              className={styles.bm_memu_wrapper}
              onClick={() => {
                setSidebarOpen(true);
              }}
            >
              <div className={`${styles.bm_menu} ${open ? styles.open : ""}`} />
            </div>
            <div
              className={styles.bm_memu_wrapper}
              onClick={() => {
                setSidebarVariantOpen(true);
              }}
            >
              <div className={`${styles.bm_menu} ${open ? styles.open : ""}`} />
            </div>
          </li>

          <li
            className={cn({
              [styles.nav_li]: scroll === false,
              [styles.nav_li_scroll]: scroll === true,
            })}
          >
            <a
              className="buy_now_button"
              onClick={() => {
                setIsAddSpecificProductToCartModalOpen(true);
              }}
            >
              BUY NOW
            </a>
          </li>
        </ul>
        <BurburMenu open={open} setOpen={setOpen} />
      </div>
      <ProductsModal open={openModal} onClose={() => setOpenModal(false)} />

      <GenericModal
        open={isAddSpecificProductToCartModalOpen}
        onClose={() => setIsAddSpecificProductToCartModalOpen(false)}
      >
        <AddSpecificProductToCartModal
          setIsAddSpecificProductToCartModalOpen={
            setIsAddSpecificProductToCartModalOpen
          }
          currentRoute={currentRoute}
        />
      </GenericModal>
      {confetti && (
        <Confetti
          active={true}
          config={{
            angle: 90,
            spread: 180,
            startVelocity: 40,
            elementCount: 220,
            dragFriction: 0.1,
            duration: 3000,
            stagger: 0,
            width: "25px",
            height: "25px",
            colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6c"],
          }}
        />
      )}
    </nav>
  );
}
