import "../styles/global.css";
import NavbarWide from "../components/navigation/navbarWide";
import Footer from "../components/navigation/footer";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useCallback, useEffect, useState, useRef } from "react";
import NavbarSmall from "../components/navigation/navbarSmall";
import { ToastContainer } from "react-toastify";
import { CartContext } from "../lib/cartContext";
import { ClientProvider } from "../lib/context";
import { CountriesProvider } from "../lib/countriesContext";
import { ProductsProvider } from "../lib/productsContext";
import UserIdleHandler from "../components/utils/UserIdleHandler";
import Sidebar from "../components/navigation/Sidebar";
import SidebarVariant from "../components/navigation/SidebarVariant";
import AuthCheck from "../components/forms/auth/AuthCheck";
import SkipToContentLink from "../components/utils/SkipToContentLink";

const StateViewer = dynamic(() => import("../components/utils/StateViewer"), {
  ssr: false,
});

export default function App({ Component, pageProps: { ...pageProps } }) {
  /*get screen size for correct navbar*/
  const navbarRef = useRef({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarVariantOpen, setSidebarVariantOpen] = useState(false);
  const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);
    const updateTarget = useCallback((e) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const navbarHight = navbarRef.current.offsetHeight;
      document.documentElement.style.setProperty(
        "--navbar-height",
        `${navbarHight - 1}px`
      );

      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };
  // new version ok

  const isBreakpoint = useMediaQuery(1111);
  return (
    <CartContext>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ClientProvider>
        <ProductsProvider>
          <CountriesProvider>
            <header>
              <SkipToContentLink />
              {isBreakpoint ? (
                <NavbarSmall />
              ) : (
                <NavbarWide
                  navbarRef={navbarRef}
                  setSidebarOpen={setSidebarOpen}
                  setSidebarVariantOpen={setSidebarVariantOpen}
                />
              )}
            </header>
            <Component {...pageProps} />
            <Footer />
            <ToastContainer />
            {/* <StateViewer stateName={"cart"} />
            <StateViewer stateName={"user"} /> */}
          </CountriesProvider>
        </ProductsProvider>
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <SidebarVariant
          setSidebarVariantOpen={setSidebarVariantOpen}
          sidebarVariantOpen={sidebarVariantOpen}
        />
        <AuthCheck fallback={<></>}>
          <UserIdleHandler />
        </AuthCheck>
      </ClientProvider>
    </CartContext>
  );
}
