import CustomInput from "../inputs/customInput";
import React, { useState, useId, useEffect } from "react";
import CustomInputDropdown from "../inputs/customInputDropdown";
import { cartState, readState } from "../../lib/cartContext";

export default function BillingInfoForm({
  userInfo = {},
  references = {},
  requiredFields = [],
  isRegister = false,
  formErrors,
  setFormErrors,
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
          margin-bottom: 3em;
          display: grid;
          grid-gap: 1.3em;

          grid-template-columns: 1fr;
        }

        @media (min-width: 432px) {
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
      {registrationType === "trial" ? (
        <>
          <div className="first_name">
            <CustomInput
              type="text"
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
            <CustomInput
              type="text"
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

          <div className="legal_name">
            <CustomInput
              type="text"
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

          <div className="country">
            <CustomInputDropdown
              type="text"
              id={`billing_country`}
              placeholder="Country"
              isRequired={requiredFields.includes("Country")}
              isRegister={isRegister}
              name="Country"
              isCountry={true}
              handleChange={handleCountryChange}
              reference={references?.billingCountryRef}
              formErrors={formErrors}
              value={country.country}
              setFormErrors={setFormErrors}
            />
          </div>
        </>
      ) : (
        <>
          {!isRegister ? (
            <div className="contact_name">
              <CustomInput
                default={userInfo?.ContactName}
                type="text"
                id={`billing_contact_name`}
                placeholder="Contact Name"
                isRequired={requiredFields.includes("ContactName")}
                isRegister={isRegister}
                name="ContactName"
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                reference={references?.contactNameRef}
              />
            </div>
          ) : (
            <>
              <div className="first_name">
                <CustomInput
                  type="text"
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
                <CustomInput
                  type="text"
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

          <div className="legal_name">
            <CustomInput
              default={userInfo?.LegalName}
              type="text"
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
            <CustomInput
              default={userInfo?.Billing?.Address}
              type="text"
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
          <div className="country">
            <CustomInputDropdown
              value={country.country}
              type="text"
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
          <div className="city">
            <CustomInput
              default={userInfo?.Billing?.City}
              type="text"
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
            <CustomInput
              default={userInfo?.Billing?.PostCode}
              type="text"
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
            <CustomInput
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
              <CustomInput
                default={userInfo?.Email}
                type="text"
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
