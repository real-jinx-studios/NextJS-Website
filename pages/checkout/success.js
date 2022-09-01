import { useEffect } from "react";
import Link from "next/link";
import { cartState } from "../../lib/cartContext";
export default function PaymentSuccessful() {
  const { cState, dispatch } = cartState();
  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
    dispatch({ type: "COMPLETE_PURCHASE" });
  }, []);
  return (
    <div className="section offset-top">
      <div className="container">
        <h1>Payment Succesful</h1>

        <Link href="/">
          <a
            className="
        underlined_link
        "
            style={{ marginBottom: 80 }}
          >
            Go to Homepage
          </a>
        </Link>
        <br />
        <br />
        <br />

        {false && (
          <>
            <p style={{ marginBottom: 111 }}>
              this is response from endpoint:
              <br />
              <br />
              {JSON.stringify(cState.response)}
            </p>
            <p>
              this is entire appwide cart state: <br /> <br />
            </p>
            <pre>
              <code style={{ color: "var(--clr-neutral-50)" }}>
                {JSON.stringify(cState, null, 2)}
              </code>
            </pre>
          </>
        )}
      </div>
    </div>
  );
}
