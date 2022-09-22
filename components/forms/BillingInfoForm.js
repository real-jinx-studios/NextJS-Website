import CustomInput from "../inputs/customInput";
import React, { useState, useId, useEffect } from "react";
import CustomInputDropdown from "../inputs/customInputDropdown";
import { cartState, readState } from "../../lib/cartContext";
import Button from "../actions/Button";
import TextInput from "../inputs/TextInput";
import VatInput from "../inputs/VatInput";
import DropdownCountries from "../inputs/DropdownCountries";

export default function BillingInfoForm({
  userInfo = {},
  references = {},
  requiredFields = [],
  isRegister = false,
  formErrors,
  setFormErrors,
  checkFormForErrors,
  registrationType = "standard",
}) {
  const id = useId();
  const { cState, dispatch } = cartState();
  const [country, setCountry] = useState({
    country: userInfo?.Billing?.Country || "",
    isVat: false,
    vat: "",
    code: "",
    vatCode: "",
    substractVAT: "",
  });

  const handleCountryChange = (e) => {
    const countryObject = {
      country: e.target.value,
      isVat: e.target?.selectedOptions[0]?.dataset?.isVat === "true" || false,
      vat: e.target?.selectedOptions[0]?.dataset?.vatPercentage,
      code: e.target?.selectedOptions[0]?.dataset?.code,
      vatCode: e.target?.selectedOptions[0]?.dataset?.vatCode,
      substractVAT:
        e.target?.selectedOptions[0]?.dataset?.substractVat === "true",
    };
    setCountry({
      ...countryObject,
    });
  };
  useEffect(() => {
    dispatch({
      type: "SET_CART_BILLING_COUNTRY_AND_VAT",
      payload: {
        ...country,
      },
    });
  }, [country]);

  return (
    <div
      className={`custom_checkout_form_fields ${
        isRegister ? "is_register" : ""
      } ${registrationType === "trial" ? "is_trial" : ""}`}
    >
      <style jsx>{`
        .custom_checkout_form_fields {
          display: grid;
          grid-column-gap: var(--margin-bottom-input, 0.82353rem);

          grid-template-areas:
            "contact_name contact_name"
            "legal_name legal_name"
            "address address"
            "country country"
            "city postcode"
            "vat vat"
            "email email";
        }

        @media (min-width: 750px) {
          .custom_checkout_form_fields {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "contact_name legal_name"
              "address address"
              "country city"
              "postcode vat"
              "email email";
          }
          .custom_checkout_form_fields.is_register {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "first_name last_name"
              "legal_name legal_name"
              "address address"
              "country city"
              "postcode vat"
              "email email";
          }
          .custom_checkout_form_fields.is_register.is_trial {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "first_name last_name"
              "legal_name legal_name"
              "country country"
              "email_address username"
              "password repeat_password";
          }
        }

        @media (min-width: 1000px) {
          .custom_checkout_form_fields {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "contact_name legal_name"
              "address address"
              "country city"
              "postcode vat"
              "email email";
          }
          .custom_checkout_form_fields.is_register {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "first_name last_name"
              "legal_name legal_name"
              "address address"
              "country city"
              "postcode vat"
              "email email";
          }
          .custom_checkout_form_fields.is_register.is_trial {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "first_name last_name"
              "legal_name legal_name"
              "country country"
              "email_address username"
              "password repeat_password";
          }
        }

        .contact_name {
          grid-area: contact_name;
        }
        .first_name {
          grid-area: first_name;
        }
        .last_name {
          grid-area: last_name;
        }

        .legal_name {
          grid-area: legal_name;
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

        .company {
          grid-area: company;
        }

        .vat {
          grid-area: vat;
        }

        .phone {
          grid-area: phone;
        }
        .email {
          grid-area: email;
        }
      `}</style>
      {isRegister && (
        <>
          <div className="first_name">
            <TextInput
              id={`billing_first_name`}
              placeholder="First Name"
              isRequired={requiredFields.includes("FirstName")}
              name="FirstName"
              isRegister={isRegister}
              reference={references?.firstNameRef}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
            />
          </div>
          <div className="last_name">
            <TextInput
              id={`billing_last_name`}
              placeholder="Last Name"
              isRequired={requiredFields.includes("LastName")}
              isRegister={isRegister}
              name="LastName"
              reference={references?.lastNameRef}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
            />
          </div>
        </>
      )}
      {!isRegister && (
        <div className="contact_name">
          <TextInput
            default={userInfo?.ContactName}
            id={`billing_contact_name`}
            placeholder="Contact Name"
            isRequired={requiredFields.includes("ContactName")}
            isRegister={isRegister}
            name="ContactName"
            formErrors={formErrors}
            reference={references?.contactNameRef}
          />
        </div>
      )}

      {registrationType !== "trial" && (
        <>
          {" "}
          <div className="legal_name">
            <TextInput
              default={userInfo?.LegalName}
              id={`billing_legal_name`}
              placeholder="Legal Name"
              isRequired={requiredFields.includes("LegalName")}
              isRegister={isRegister}
              name="LegalName"
              reference={references?.legalNameRef}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
            />
          </div>
          <div className="address">
            <TextInput
              default={userInfo?.Billing?.Address}
              id={`billing_address`}
              placeholder="Address"
              isRegister={isRegister}
              name="Address"
              isRequired={requiredFields.includes("Address")}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              reference={references?.billingAddressRef}
            />
          </div>
        </>
      )}
      <div className="country">
        <DropdownCountries
          value={country.country}
          id={`billing_country`}
          placeholder="Country"
          isRequired={requiredFields.includes("Country")}
          isRegister={isRegister}
          name="Country"
          isCountry={true}
          handleChange={handleCountryChange}
          reference={references?.billingCountryRef}
          formErrors={formErrors}
          setCountry={setCountry}
          setFormErrors={setFormErrors}
        />
      </div>
      {registrationType !== "trial" && (
        <>
          <div className="city">
            <TextInput
              default={userInfo?.Billing?.City}
              id={`billing_city`}
              placeholder="City"
              isRegister={isRegister}
              name="City"
              isRequired={requiredFields.includes("City")}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              reference={references?.billingCityRef}
            />
          </div>
          <div className="postcode">
            <TextInput
              default={userInfo?.Billing?.PostCode}
              id={`billing_postcode`}
              placeholder="Postal Code"
              isRegister={isRegister}
              name="Postcode"
              isRequired={requiredFields.includes("Postcode")}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              reference={references?.billingPostcodeRef}
            />
          </div>

          <div className="vat">
            <VatInput
              default={userInfo?.VAT_ID}
              type="text"
              id={`billing_vat`}
              placeholder="VAT Number"
              name="VatID"
              isRegister={isRegister}
              special="vat"
              isRequired={requiredFields.includes("VAT_ID")}
              reference={references?.vatRef}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              country={country}
              countryReference={references?.billingCountryRef}
            />
          </div>
          {references?.emailAddressRef && (
            <div className="email">
              <TextInput
                default={userInfo?.Email}
                id={`billing_email`}
                placeholder="Email"
                isRegister={isRegister}
                isRequired={requiredFields.includes("Email")}
                name="Email"
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                reference={references?.emailAddressRef}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
