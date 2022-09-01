import CustomInput from "../inputs/customInput";
import React, { useState, useEffect } from "react";
import CustomInputDropdown from "../inputs/customInputDropdown";
import { cartState } from "../../lib/cartContext";

export default function ShippingInfoForm({
  userInfo = {},
  references = {},
  formErrors = {},
  setFormErrors,
  requiredFields = [],
}) {
  const { dispatch } = cartState();
  const [country, setCountry] = useState({
    country: userInfo?.Shipping.Country || "",
    isVat: false,
    vat: "",
    code: "",
    vatCode: "",
    substractVAT: "",
  });

  useEffect(() => {
    dispatch({
      type: "SET_SHIPPING_INFO_COUNTRY_CODE",
      payload: {
        ...country,
      },
    });
  }, [country]);

  const handleCountryChange = (e) => {
    const countryObject = {
      country: e.target.value,
      isVat: e.target?.selectedOptions[0]?.dataset?.isVat || false,
      vat: e.target?.selectedOptions[0]?.dataset?.vatPercentage,
      code: e.target?.selectedOptions[0]?.dataset?.code,
      vatCode: e.target?.selectedOptions[0]?.dataset?.vatCode,
      substractVAT: e.target?.selectedOptions[0]?.dataset?.substractVat,
    };
    setCountry({
      ...countryObject,
    });
  };
  return (
    <div className="custom_checkout_form_fields">
      <style jsx>{`
        .custom_checkout_form_fields {
          margin-bottom: 3em;
          display: grid;
          grid-gap: 1.3em;

          grid-template-columns: 1fr;
        }

        @media (min-width: 432px) {
          .custom_checkout_form_fields {
            grid-template-areas:
              "recipient recipient"
              "country city"
              "address address"
              "postcode recipient_phone";
          }
        }

        .recipient {
          grid-area: recipient;
        }

        .recipient_phone {
          grid-area: recipient_phone;
        }

        .address {
          grid-area: address;
        }

        .city {
          grid-area: city;
        }

        .country {
          grid-area: country;
        }

        .postcode {
          grid-area: postcode;
        }
      `}</style>
      <div className="recipient">
        <CustomInput
          default={
            userInfo?.Shipping?.RecipientName || userInfo?.Shipping?.Recipient
          }
          type="text"
          id={`shipping_recipient`}
          placeholder="Recipient Name"
          isRequired={requiredFields.includes("RecipientName")}
          name="RecipientName"
          formErrors={formErrors}
          reference={references.shippingRecipientRef}
        />
      </div>
      <div className="country">
        <CustomInputDropdown
          value={country.country}
          type="text"
          id={`shipping_country`}
          placeholder="Country"
          isRequired={requiredFields.includes("Country")}
          name="Country"
          isCountry={true}
          handleChange={handleCountryChange}
          reference={references?.shippingCountryRef}
          formErrors={formErrors}
          setCountry={setCountry}
          setFormErrors={setFormErrors}
        />
      </div>
      <div className="city">
        <CustomInput
          default={userInfo?.Shipping?.City}
          type="text"
          id={`shipping_city`}
          placeholder="City"
          name="City"
          isRequired={requiredFields.includes("City")}
          formErrors={formErrors}
          reference={references.shippingCityRef}
        />
      </div>
      <div className="address">
        <CustomInput
          default={userInfo?.Shipping?.Address}
          type="text"
          id={`shipping_address`}
          placeholder="Address"
          name="Address"
          isRequired={requiredFields.includes("Address")}
          formErrors={formErrors}
          reference={references.shippingAddressRef}
        />
      </div>

      <div className="postcode">
        <CustomInput
          default={userInfo?.Shipping?.PostCode}
          type="text"
          id={`shipping_postcode`}
          placeholder="Postal Code"
          name="Postcode"
          isRequired={requiredFields.includes("Postcode")}
          formErrors={formErrors}
          reference={references.shippingPostcodeRef}
        />
      </div>
      <div className="recipient_phone">
        <CustomInput
          default={userInfo?.Shipping?.RecipientPhone}
          type="text"
          id={`shipping_recipient_phone`}
          isRequired={requiredFields.includes("RecipientPhone")}
          placeholder="Recipient Phone"
          name="RecipientPhone"
          formErrors={formErrors}
          reference={references.shippingRecipientPhoneRef}
        />
      </div>
    </div>
  );
}
