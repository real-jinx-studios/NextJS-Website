import styles from "./services_portal.module.css";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";
import LoaderDots from "../utils/loaderDots";
import BillingInfoForm from "../forms/BillingInfoForm";
import ShippingInfoForm from "../forms/ShippingInfoForm";
import { promiseResolver } from "../../lib/promiseResolver";

import ParrotLoader from "../utils/ParrotLoader";
import { useClient } from "../../lib/context";
export default function BillingInformation() {
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [clisntInfo, setClientInfo] = useState(null);
  const { updateClientInfo, getClientInfo, getFullClientInfo } = useClient();

  //reference all form input fields
  const legalNameRef = useRef();
  const contactNameRef = useRef();
  const billingCountryRef = useRef();
  const billingCityRef = useRef();
  const vatRef = useRef();
  const billingAddressRef = useRef();
  const billingPostcodeRef = useRef();
  //ref for use shipping info
  const shippingCountryRef = useRef();
  const shippingCityRef = useRef();
  const shippingAddressRef = useRef();
  const shippingRecipientRef = useRef();
  const shippingRecipientPhoneRef = useRef();
  const shippingPostcodeRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    if (getClientInfo()) {
      setClientInfo(getClientInfo());
      setIsLoading(false);
    } else {
      const getData = async () => {
        const data = await getFullClientInfo();
        setClientInfo(data);
        setIsLoading(false);
      };
      getData();
    }
  }, []);

  const handleInfoUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);
      return;
    }

    const billingInfoObject = {
      LegalName: legalNameRef.current.value,
      ContactName: contactNameRef.current.value,
      Country: billingCountryRef.current.value,
      City: billingCityRef.current.value,
      VatID: vatRef.current.value,
      Address: billingAddressRef.current.value,
      PostCode: billingPostcodeRef.current.value,
    };

    const shippingInfoObject = {
      Recipient: shippingRecipientRef.current.value,
      Country: shippingCountryRef.current.value,
      City: shippingCityRef.current.value,
      RecipientPhone: shippingRecipientPhoneRef.current.value,
      Address: shippingAddressRef.current.value,
      PostCode: shippingPostcodeRef.current.value,
    };
    const formFieldsBilling = {
      ...billingInfoObject,
    };
    const formFieldsShipping = {
      ...shippingInfoObject,
    };
    //remove empty fields from the object
    const formFieldsBillingCleaned = Object.keys(formFieldsBilling).reduce(
      (acc, key) => {
        if (formFieldsBilling[key]) {
          acc[key] = formFieldsBilling[key];
        }
        return acc;
      },
      {}
    );
    const formFieldsShippingCleaned = Object.keys(formFieldsShipping).reduce(
      (acc, key) => {
        if (formFieldsShipping[key]) {
          acc[key] = formFieldsShipping[key];
        }
        return acc;
      },
      {}
    );

    const newUserInfo = {
      Billing: { ...billingInfoObject },
      Shipping: { ...shippingInfoObject },
    };

    const res = await updateClientInfo(newUserInfo);

    setIsLoading(false);
  };

  //check if form has any errors
  const checkFormForErrors = () => {
    const errorObject = {};
    if (legalNameRef.current.value == "") {
      errorObject.LegalName = "Please enter your legal name";
    }
    if (contactNameRef.current.value == "") {
      errorObject.ContactName = "Please enter your contact name";
    }
    if (billingCountryRef.current.value == "") {
      errorObject.Country = "Please enter your billing country";
    }

    setFormErrors(errorObject);
    return errorObject;
  };

  if (!isLoading) {
    return (
      <>
        <div className={styles.content}>
          <div className={styles.title_wrapper}>
            <h2>Billing Information</h2>
          </div>
          <div className={styles.content_inner}>
            <form
              className={`${styles.billing_form} ${
                isLoading ? styles.updating_form : ""
              }`}
              onSubmit={handleInfoUpdate}
            >
              <BillingInfoForm
                userInfo={{ ...getClientInfo() }}
                references={{
                  legalNameRef: legalNameRef,
                  contactNameRef: contactNameRef,
                  billingCountryRef: billingCountryRef,
                  billingCityRef: billingCityRef,
                  vatRef: vatRef,
                  billingAddressRef: billingAddressRef,
                  billingPostcodeRef: billingPostcodeRef,
                }}
                requiredFields={[
                  "LegalName",
                  "FirstName",
                  "LastName",
                  "ContactName",
                  "Country",
                  "LegalName",
                  "Country",
                ]}
                formErrors={formErrors}
              />
            </form>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.title_wrapper}>
            <h2>Shipping Information</h2>
          </div>
          <div className={styles.content_inner}>
            <form
              className={`${styles.billing_form} ${
                isLoading ? styles.updating_form : ""
              }`}
              onSubmit={handleInfoUpdate}
            >
              <ShippingInfoForm
                userInfo={{ ...getClientInfo() }}
                references={{
                  shippingRecipientRef: shippingRecipientRef,
                  shippingCountryRef: shippingCountryRef,
                  shippingCityRef: shippingCityRef,
                  shippingRecipientPhoneRef: shippingRecipientPhoneRef,
                  shippingAddressRef: shippingAddressRef,
                  shippingPostcodeRef: shippingPostcodeRef,
                }}
                formErrors={formErrors}
                requiredFields={[]}
              />
              <div className={styles.submit_buttons}>
                {Object.keys(formErrors).length > 0 && (
                  <h3>You have some errors in your form.</h3>
                )}
                <button
                  className="button button_basic_long_on_light_bg"
                  onClick={handleInfoUpdate}
                >
                  save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else if (isLoading) {
    return (
      <div className={`flex-center-center ${styles.content}`}>
        <ParrotLoader />
      </div>
    );
  } else {
    return (
      <div className={`flex-center-center ${styles.content}`}>
        <button
          className="button button_basic_long_on_light_bg"
          onClick={() => {
            dispatch({ type: "GET_USER_INFO" });
          }}
        >
          reload info
        </button>
      </div>
    );
  }
}
