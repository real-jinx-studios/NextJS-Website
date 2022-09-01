import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";

import AuthCheck from "../../components/forms/auth/AuthCheck";
import AuthFormWarpper from "../../components/forms/AuthFormWrapper";
import CheckoutWrapper from "../../components/checkout/CheckoutWrapper";

function Checkout() {
  return (
    <AuthCheck
      fallback={
        <div className="section offset-top">
          <div className="container">
            <AuthFormWarpper />
          </div>
        </div>
      }
    >
      <CheckoutWrapper />
    </AuthCheck>
  );
}

export default dynamic(() => Promise.resolve(Checkout), {
  ssr: false,
});
