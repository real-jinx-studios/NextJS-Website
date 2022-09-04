import styles from "./steps.module.css";
import CustomInput from "../../inputs/customInput";
import React, { useRef, useState, useEffect } from "react";

import { promiseResolver } from "../../../lib/promiseResolver";
import Cookies from "js-cookie";
import LoaderDots from "../../utils/loaderDots";
import ShippingInfoForm from "../../forms/ShippingInfoForm";
import { cartState } from "../../../lib/cartContext";
import { useClient } from "../../../lib/context";

export default function ShippingInfoStep({
  setCurrentStepNumber,
  isCartEditable = false,
  setIsCartEditable,
  stepNumber,
  stepIncrement,
  setStepValid,
  stepDecrement,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const { getClientInfo, getFullClientInfo } = useClient();
  const { cState, dispatch } = cartState();
  const [userData, setUserData] = useState(null);
  const [isShippingSameAsBilling, setIsShippingSameAsBilling] = useState(
    cState.billingInfo.isShippingSameAsBilling
  );
  const isShippingValid = cState.checkout.shipping;

  useEffect(() => {
    setIsLoading(true);
    if (isShippingValid) {
      if (cState.billingInfo.isShippingSameAsBilling) {
        setUserData({
          Shipping: {
            RecipientName: cState.billingInfo.ContactName,
            Address: cState.billingInfo.Billing.Address,
            City: cState.billingInfo.Billing.City,
            PostCode: cState.billingInfo.Billing.PostCode,
            Country: cState.billingInfo.Billing.Country,
            RecipientPhone: isShippingValid
              ? cState.shippingInfo.Shipping.RecipientPhone
              : "",
          },
        });
        setIsLoading(false);
      } else {
        setUserData(cState.shippingInfo);
      }
      setIsLoading(false);
    } else if (!userData) {
      if (cState.billingInfo.isShippingSameAsBilling) {
        setUserData({
          Shipping: {
            RecipientName: cState.billingInfo.ContactName,
            Address: cState.billingInfo.Billing.Address,
            City: cState.billingInfo.Billing.City,
            PostCode: cState.billingInfo.Billing.PostCode,
            Country: cState.billingInfo.Billing.Country,
            RecipientPhone: isShippingValid
              ? cState.shippingInfo.Shipping.RecipientPhone
              : "",
          },
        });
        setIsLoading(false);
      } else if (getClientInfo()) {
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
  const shippingCountryRef = useRef();
  const shippingCityRef = useRef();
  const shippingAddressRef = useRef();
  const shippingRecipientRef = useRef();
  const shippingRecipientPhoneRef = useRef();
  const shippingPostcodeRef = useRef();

  const shippingCountryForwardRef = useRef();

  const handleShippingSubmit = (e) => {
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
    dispatch({
      type: "SET_SHIPPING_INFO",
      payload: {
        Shipping: {
          Country: shippingCountryRef.current.value,
          City: shippingCityRef.current.value,
          Address: shippingAddressRef.current.value,
          RecipientName: shippingRecipientRef.current.value,
          RecipientPhone: shippingRecipientPhoneRef.current.value,
          PostCode: shippingPostcodeRef.current.value,
        },
      },
    });
    return true;
  };
  const handleShippingCancel = (e) => {
    e.preventDefault();
    const isValid = handleShippingSubmit();
    setStepValid(isValid);
    stepDecrement();
  };

  const handleShippingSameAsBilling = (e) => {
    setIsShippingSameAsBilling(!isShippingSameAsBilling);
    if (!isShippingSameAsBilling) {
      dispatch({
        type: "SET_SHIPPING_SAME_AS_BILLING",
        payload: !isShippingSameAsBilling,
      });
      setUserData({
        Shipping: {
          RecipientName: cState.billingInfo.ContactName,
          Address: cState.billingInfo.Billing.Address,
          City: cState.billingInfo.Billing.City,
          PostCode: cState.billingInfo.Billing.PostCode,
          Country: cState.billingInfo.Billing.Country,
          RecipientPhone: isShippingValid
            ? cState.shippingInfo.Shipping.RecipientPhone
            : "",
        },
      });
      shippingRecipientRef.current.value = cState.billingInfo.ContactName;
      shippingAddressRef.current.value = cState.billingInfo.Billing.Address;
      shippingCityRef.current.value = cState.billingInfo.Billing.City;
      shippingPostcodeRef.current.value = cState.billingInfo.Billing.PostCode;
      shippingCountryRef.current.value = cState.billingInfo.Billing.Country;

      shippingCountryForwardRef.current.set({
        country: cState.billingInfo.Billing.Country,
        isVat: cState.vat.isVat,
        vat: cState.vat.vatPercentage,
        code: cState.vat.code,
        vatCode: cState.vat.vatCode,
        substractVAT: cState.vat.substractVAT,
      });
    }
  };

  //check if form has any errors
  const checkFormForErrors = () => {
    const errorObject = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!shippingRecipientRef.current.value) {
      errorObject.RecipientName = "Please enter a recipient name";
    }
    if (!shippingAddressRef.current.value) {
      errorObject.Address = "Please enter an address";
    }
    if (!shippingCityRef.current.value) {
      errorObject.City = "Please enter a city";
    }
    if (!shippingPostcodeRef.current.value) {
      errorObject.Postcode = "Please enter a postcode";
    }
    if (!shippingCountryRef.current.value) {
      errorObject.Country = "Please enter a country";
    }
    if (!shippingRecipientPhoneRef.current.value) {
      errorObject.RecipientPhone = "Please enter a phone number";
    }

    setFormErrors(errorObject);
    return errorObject;
  };
  const verifyStep = (e) => {
    const isValid = handleShippingSubmit(e);
    setStepValid(isValid);
    stepIncrement();
  };

  useEffect(() => {
    if (cState.setStepToBeActive === true) {
      const isValid = handleShippingSubmit();
      setStepValid(isValid);
      dispatch({
        type: "SET_STEP",
      });
    }
  }, [cState.setStepToBeActive]);

  if (!isLoading) {
    return (
      <div
        className={styles.billing}
        // onClick={isCartEditable ? () => setIsCartEditable(false) : ""}
      >
        <style jsx>{`
          .same-as-billing-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 1rem;
            align-items: center;
            margin-bottom: 20px;
          }
          .next-step-wrapper {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
          }
        `}</style>
        {
          <div
            className={`${styles.billing__inner} ${
              isCartEditable ? styles.cart_editable : ""
            }`}
            data-step={stepNumber}
          >
            <h3 className={styles.billing__title}>Shipping details</h3>
            <ShippingInfoForm
              userInfo={userData}
              references={{
                shippingRecipientRef: shippingRecipientRef,
                shippingCountryRef: shippingCountryRef,
                shippingCityRef: shippingCityRef,
                shippingRecipientPhoneRef: shippingRecipientPhoneRef,
                shippingAddressRef: shippingAddressRef,
                shippingPostcodeRef: shippingPostcodeRef,
              }}
              requiredFields={[
                "RecipientName",
                "Country",
                "City",
                "Address",
                "Postcode",
                "RecipientPhone",
              ]}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              ref={shippingCountryForwardRef}
            />

            <div>
              <div className="same-as-billing-wrapper">
                <input
                  type="checkbox"
                  name="isShipping"
                  value={isShippingSameAsBilling}
                  checked={isShippingSameAsBilling}
                  onChange={() => handleShippingSameAsBilling()}
                />
                <label htmlFor="isShipping">Shipping same as billing</label>
              </div>
            </div>
            <div className={styles.step_actions}>
              <button
                className="button button_basic_long_on_light_bg"
                onClick={verifyStep}
              >
                Next
              </button>
              <button
                className="button button_basic_long_on_light_bg"
                onClick={handleShippingCancel}
              >
                Previous
              </button>
            </div>
          </div>
        }
      </div>
    );
  } else {
    return <LoaderDots size="l" color="system" />;
  }
}
