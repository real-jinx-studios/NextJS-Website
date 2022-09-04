import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useClient } from "../../../lib/context";

import FancyLoader from "../../utils/FancyLoader";

// Component's children only shown to logged-in users
function AuthCheck(props) {
  const {
    getClientVerified,

    isClientVerified,
  } = useClient();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setVerified(getClientVerified());
    setLoading(false);
  }, [isClientVerified]);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        verified: verified,
      });
    }
    return child;
  });

  return verified ? (
    <>{childrenWithProps}</>
  ) : loading ? (
    <div className="section offset-top">
      <div className="container flex-center-center">
        <FancyLoader size="150" fontSize="1.25" white="true" />
      </div>
    </div>
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
