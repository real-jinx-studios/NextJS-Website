import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "../services_portal.module.css";
import { promiseResolver } from "../../../lib/promiseResolver";
import CustomInput from "../../inputs/customInput";
import FancyLoader from "../../utils/FancyLoader";
import { useClient } from "../../../lib/context";
export default function ChangeEmail() {
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [emailChanged, setEmailChanged] = useState(false);

  const { getClientInfo } = useClient();

  const emailRef = useRef();
  const checkFormForErrors = () => {
    const errorObject = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (emailRef.current.value == "") {
      errorObject.Email = "Please enter your email address";
    } else if (!regex.test(emailRef.current.value)) {
      errorObject.Email = "Email not valid";
    }

    setFormErrors(errorObject);
    return errorObject;
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return;
    }
    let emailExists = false;
    emailExists = Math.random() > 0.5;
    //make artificial delay to simulate api call

    if (emailExists) {
      setFormErrors({
        ...formErrors,
        Email: "Email already exists",
      });
      setIsLoading(false);
      return;
    }

    toast.success("Email changed successfully!", {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setEmailChanged(true);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  return (
    <div className="email-wrapper">
      <style jsx>{`
        .email-success-title {
          font-size: 1.5em;
          color: var(--clr-correct);
        }
      `}</style>
      {emailChanged && (
        <div className="email-changed">
          <h3 className="      email-success-title ">
            Email Changed successfully
          </h3>
          <CustomInput
            default={getClientInfo().Email}
            type="text"
            placeholder="Email"
            name="Email"
            reference={emailRef}
            isDisabled
          />
          <div className="email-actions">
            <button
              onClick={() => {
                setEmailChanged(false);
              }}
              className="button button_basic_long_on_light_bg "
            >
              Change email again
            </button>
          </div>
        </div>
      )}

      {!emailChanged && !isLoading && (
        <>
          <CustomInput
            default={getClientInfo().Email}
            type="text"
            placeholder="Email"
            name="Email"
            reference={emailRef}
            formErrors={formErrors}
            isRequired
            setFormErrors={setFormErrors}
          />
          <div className="email-actions">
            <button
              onClick={handleEmailChange}
              className="button button_basic_long_on_light_bg "
            >
              Change email
            </button>
          </div>
        </>
      )}
      {!emailChanged && isLoading && <FancyLoader size="150" fontSize="1.25" />}
    </div>
  );
}
