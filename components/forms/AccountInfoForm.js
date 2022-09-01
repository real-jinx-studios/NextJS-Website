import styles from "../services_portal/customPayment/custom_payment.module.css";
import CustomInput from "../inputs/customInput";
import React from "react";
import CustomInputDropdown from "../inputs/customInputDropdown";

export default function AccountInfoForm({
  references = {},
  formErrors,
  setFormErrors,
  isRegister,
  requiredFields = [],
}) {
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
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "email_address username"
              "password repeat_password";
          }
        }

        .email_address {
          grid-area: email_address;
        }

        .username {
          grid-area: username;
        }

        .password {
          grid-area: password;
        }

        .repeat_password {
          grid-area: repeat_password;
        }
      `}</style>
      <div className="email_address">
        <CustomInput
          type="text"
          placeholder="Email Address"
          isRequired={requiredFields.includes("Email")}
          id={`account_email`}
          name="Email"
          reference={references?.emailAddressRef}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          isRegister={isRegister}
        />
      </div>
      <div className="username">
        <CustomInput
          type="text"
          placeholder="Username"
          isRequired={requiredFields.includes("Username")}
          id={`account_username`}
          name="Username"
          reference={references?.usernameRef}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          isRegister={isRegister}
        />
      </div>

      <div className="password">
        <CustomInput
          type="password"
          placeholder="Password"
          isRegisterPassword={true}
          isRequired={requiredFields.includes("Password")}
          id={`account_password`}
          name="Password"
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          isRegister={isRegister}
          reference={references?.passwordRef}
          repeatPasswordRef={references?.repeatPasswordRef}
        />
      </div>
      <div className="repeat_password">
        <CustomInput
          type="password"
          placeholder="Repeat Password"
          isRequired={requiredFields.includes("RepeatPassword")}
          id={`account_repeat_password`}
          isRepeatPassword={true}
          isRegisterPassword={true}
          name="RepeatPassword"
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          isRegister={isRegister}
          passwordReference={references?.passwordRef}
          reference={references?.repeatPasswordRef}
        />
      </div>
    </div>
  );
}
