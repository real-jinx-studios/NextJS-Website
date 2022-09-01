import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClient } from "../../../lib/context";

import LoaderDots from "../../utils/loaderDots";

// Component's children only shown to logged-in users
function AuthCheck(props) {
  const { verifyClientToken, getClientToken, logoutClient } = useClient();
  const [verified, setVerified] = useState(false);
  const clientToken = getClientToken();

  let validating = false;

  if (clientToken) {
    validating = true;

    verifyClientToken()
      .then((res) => {
        if (res === 200) {
          validating = false;
          setVerified(true);
          return true;
        } else if (res === 400) {
          validating = false;
          logoutClient();
          setVerified(false);

          return false;
        } else {
          validating = false;
          setVerified(false);
          return false;
        }
      })
      .catch((err) => {
        validating = false;
        setVerified(false);
        return false;
      });
  }

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        verified: verified,
        clientToken: clientToken,
      });
    }
    return child;
  });

  return verified ? (
    <>{childrenWithProps}</>
  ) : validating ? (
    <LoaderDots size="m" color="system" />
  ) : (
    props.fallback || (
      <section className="section offset-top">
        <div className="container flex-center-center x">
          <Link href="/user/login" replace>
            <a>You must be signed in</a>
          </Link>
        </div>
        <style jsx>{`
          .x {
            position: relative;
            z-index: 1;
            margin: 8em auto;
          }
          .x::before {
            content: "X";
            font-size: 35rem;
            font-weight: bold;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: var(--clr-neutral-50);
            opacity: 0.1;
            z-index: -1;
          }
          .x a {
            border: 1px solid var(--clr-neutral-500);
            padding: 0.4rem 1.2rem;
            transition: all 0.3s ease;
          }
          .x a:hover {
            background-color: var(--clr-neutral-500);
            color: var(--clr-neutral-100);
          }
        `}</style>
      </section>
    )
  );
}

export default dynamic(() => Promise.resolve(AuthCheck), {
  ssr: false,
});
