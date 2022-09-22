import { useEffect, useRef } from "react";
import Link from "next/link";
import { cartState } from "../../lib/cartContext";
export default function BankTransferRequest() {
  const { cState, dispatch } = cartState();
  const cartRef = useRef(cState);
  useEffect(() => {
    console.log("cartRef.current", cartRef.current);
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
        <ul>
          {cartRef.current.items((item) => {
            return <li>{item.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
