import CustomInput from "../inputs/customInput";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import CustomInputDropdown from "../inputs/customInputDropdown";
import { cartState } from "../../lib/cartContext";
import TextInput from "../inputs/TextInput";

import DropdownCountries from "../inputs/DropdownCountries";

const ShippingInfoForm = forwardRef(
  (
    {
      userInfo = {},
      references = {},
      formErrors = {},
      setFormErrors,
      requiredFields = [],
      checkFormForErrors,
      isShippingSameAsBilling,
    },
    ref
  ) => {
    const { dispatch } = cartState();
    const [country, setCountry] = useState({
      country: userInfo?.Shipping.Country || "",
      isVat: false,
      vat: "",
      code: "",
      vatCode: "",
      substractVAT: "",
    });
    useImperativeHandle(ref, () => ({
      set(c) {
        console.log("set", c);

        setCountry(c);
      },
      get() {
        return "aswfljghsdeaeguihfkia";
      },
    }));

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
            grid-column-gap: var(--margin-bottom-input, 0.82353rem);

            grid-template-areas:
              "recipient recipient"
              "country city"
              "address address"
              "postcode recipient_phone";
          }

          @media (min-width: 950px) {
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
          <TextInput
            default={
              userInfo?.Shipping?.RecipientName || userInfo?.Shipping?.Recipient
            }
            id={`shipping_recipient`}
            placeholder="Recipient Name"
            isRequired={requiredFields.includes("RecipientName")}
            name="RecipientName"
            formErrors={formErrors}
            reference={references.shippingRecipientRef}
          />
        </div>
        <div className="country">
          <DropdownCountries
            value={country.country}
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
          <TextInput
            default={userInfo?.Shipping?.City}
            id={`shipping_city`}
            placeholder="City"
            name="City"
            isRequired={requiredFields.includes("City")}
            formErrors={formErrors}
            reference={references.shippingCityRef}
          />
        </div>
        <div className="address">
          <TextInput
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
          <TextInput
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
          <TextInput
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
);
export default ShippingInfoForm;
