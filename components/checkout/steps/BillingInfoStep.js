import styles from "./steps.module.css";
import CustomInput from "../../inputs/customInput";
import React, { useEffect, useRef, useState } from "react";

import { promiseResolver } from "../../../lib/promiseResolver";
import Cookies from "js-cookie";
import LoaderDots from "../../utils/loaderDots";
import BillingInfoForm from "../../forms/BillingInfoForm";
import { cartState } from "../../../lib/cartContext";
import { useClient } from "../../../lib/context";
import ParrotLoader from "../../utils/ParrotLoader";

export default function BillingInfoSteps({
  isCartEditable = false,
  stepNumber,
  setStepValid,
  hasShipping = false,
  stepIncrement,
  stepName,
  isValid,
}) {
  const [isLoading, setIsLoading] = useState(true);

  const [formErrors, setFormErrors] = useState({});
  const [isShippingSameAsBilling, setIsShippingSameAsBilling] = useState(false);
  const { getClientInfo, getFullClientInfo } = useClient();
  const [userData, setUserData] = useState(null);
  const { cState, dispatch } = cartState();

  const isBillingValid = cState.checkout.billing;

  useEffect(() => {
    setIsLoading(true);
    if (isBillingValid) {
      setUserData(cState.billingInfo);
      setIsShippingSameAsBilling(cState.billingInfo.isShippingSameAsBilling);
      setIsLoading(false);
    } else if (!userData) {
      if (getClientInfo()) {
        setUserData(getClientInfo());
        setIsLoading(false);
      } else {
        const getData = async () => {
          const data = await getFullClientInfo();
          setUserData(data);
          setIsLoading(false);
        };
        getData();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  //reference all form input fields
  const legalNameRef = useRef();
  const contactNameRef = useRef();
  const billingCountryRef = useRef();
  const billingCityRef = useRef();
  const vatRef = useRef();
  const billingAddressRef = useRef();
  const billingPostcodeRef = useRef();
  const emailAddressRef = useRef();

  useEffect(() => {
    dispatch({
      type: "SET_CART_LOCKED",
      payload: false,
    });
  }, []);

  const handleBillingSubmit = (e) => {
    e?.preventDefault();
    if (typeof e === "object") {
      e.preventDefault();
    }
    setIsLoading(true);

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return false;
    }
    const billingDetails = {
      LegalName: legalNameRef.current.value,
      ContactName: contactNameRef.current.value,
      Email: emailAddressRef.current.value,
      VAT_ID: vatRef.current.value,
      Billing: {
        Country: billingCountryRef.current.value,
        City: billingCityRef.current.value,

        Address: billingAddressRef.current.value,
        PostCode: billingPostcodeRef.current.value,
      },
      isShippingSameAsBilling: isShippingSameAsBilling,
    };
    dispatch({
      type: "SET_BILLING_INFO",
      payload: { billingDetails, stepName },
    });
    return true;
  };

  const verifyStep = (e) => {
    const isValid = handleBillingSubmit(e);
    setStepValid(isValid);
    stepIncrement();
  };

  useEffect(() => {
    if (cState.setStepToBeActive === true) {
      const isValid = handleBillingSubmit();
      setStepValid(isValid);
      dispatch({
        type: "SET_STEP",
      });
    }
  }, [cState.setStepToBeActive]);

  //check if form has any errors
  const checkFormForErrors = () => {
    const errorObject = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (legalNameRef.current.value == "") {
      errorObject.LegalName = "Please enter your legal name";
    }
    if (contactNameRef.current.value == "") {
      errorObject.ContactName = "Please enter your contact name";
    }

    if (billingCountryRef?.current.value == "") {
      errorObject.Country = "Please enter your  country";
    }
    if (billingCityRef?.current.value == "") {
      errorObject.City = "Please enter your  city";
    }
    if (billingAddressRef?.current.value == "") {
      errorObject.Address = "Please enter your  address";
    }
    if (billingPostcodeRef?.current.value == "") {
      errorObject.Postcode = "Please enter your  postcode";
    }
    if (emailAddressRef.current.value == "") {
      errorObject.Email = "Please enter your email address";
    } else if (!regex.test(emailAddressRef.current.value)) {
      errorObject.Email = "Email not valid";
    }

    setFormErrors(errorObject);
    return errorObject;
  };

  return (
    <div className={styles.billing}>
      <style jsx>{`
        .same-as-billing-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: left;
          gap: 1em;
          align-items: center;
          margin-bottom: 20px;
        }
        .next-step-wrapper {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        .no-items {
          text-align: center;
          color: var(--clr-neutral-800);
        }
      `}</style>
      {
        <div
          className={`${styles.billing__inner} ${
            isCartEditable ? styles.cart_editable : ""
          }`}
          data-step={stepNumber}
        >
          <h3 className={styles.billing__title}>Billing details</h3>
          {!isLoading && (
            <>
              <BillingInfoForm
                userInfo={userData}
                setFormErrors={setFormErrors}
                formErrors={formErrors}
                requiredFields={[
                  "LegalName",
                  "ContactName",
                  "Email",
                  "Country",
                  "City",
                  "Address",
                  "Postcode",
                ]}
                references={{
                  legalNameRef: legalNameRef,
                  contactNameRef: contactNameRef,
                  billingCountryRef: billingCountryRef,
                  billingCityRef: billingCityRef,
                  vatRef: vatRef,
                  billingAddressRef: billingAddressRef,
                  billingPostcodeRef: billingPostcodeRef,
                  emailAddressRef: emailAddressRef,
                }}
              />
              {cState.items.length > 0 && (
                <div>
                  {cState.checkout.shippableCount > 0 && (
                    <div className="same-as-billing-wrapper">
                      <input
                        type="checkbox"
                        name="isShipping"
                        value={isShippingSameAsBilling}
                        checked={isShippingSameAsBilling}
                        onChange={() =>
                          setIsShippingSameAsBilling(!isShippingSameAsBilling)
                        }
                      />
                      <label htmlFor="isShipping">
                        Shipping same as billing
                      </label>
                    </div>
                  )}
                  <div className={styles.step_actions}>
                    <button
                      className="button button_basic_long_on_light_bg"
                      onClick={verifyStep}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {cState.items.length === 0 && (
                <h4 className="no-items">
                  You have no items in your cart. Please add items to your cart.
                </h4>
              )}
            </>
          )}
          {isLoading && (
            <div className="flex-center-center">
              <ParrotLoader />
            </div>
          )}
        </div>
      }
    </div>
  );
}
