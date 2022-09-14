import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "../services_portal.module.css";
import { promiseResolver } from "../../../lib/promiseResolver";
import CustomInput from "../../inputs/customInput";
import FancyLoader from "../../utils/FancyLoader";
import { useClient } from "../../../lib/context";
import GenericModal from "../../modal/GenericModal";
import PasswordPromptModal from "../../modal/PasswordPromptModal";
export default function ChangeEmail() {
  const [isPasswordPromptModalOpen, setIsPasswordPromptModalOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [emailChanged, setEmailChanged] = useState(false);
  const [emailResent, setEmailResent] = useState(false);

  const { getClientInfo, changeEmail, resendChangeEmailVerification } =
    useClient();

  const emailRef = useRef();
  const oldEmailRef = useRef(getClientInfo()?.Email || null);
  const loginTokenRef = useRef();
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

  const handleEmailChange = async (loginToken) => {
    setIsLoading(true);
    loginTokenRef.current = loginToken;

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return;
    }
    if (!emailRef.current?.value) return;
    const email = emailRef.current.value;
    const res = await changeEmail(email, loginToken);

    if (res.status === 400 && res.message) {
      setFormErrors({
        ...formErrors,
        Email: res.message,
      });
      setIsLoading(false);

      return;
    } else if (res.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    } else if (res.status === 200) {
      toast.info("Email request sent", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      emailRef.current = res.newEmail;
    }

    setEmailChanged(true);
    setIsLoading(false);
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    const res = await changeEmail(emailRef.current, loginTokenRef.current);
    if (res.status === 400 && res.message) {
      setFormErrors({
        ...formErrors,
        Email: res.message,
      });
      setIsLoading(false);

      return;
    } else if (res.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    } else if (res.status === 200) {
      toast.info("Email request resent!", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setEmailResent(true);
    }
  };

  const handleClick = () => {
    if (emailRef.current.value === oldEmailRef.current) {
      setFormErrors({
        ...formErrors,
        Email: "Please enter a new email address",
      });
      return;
    }

    setIsPasswordPromptModalOpen(true);
  };

  return (
    <div className="email-wrapper">
      <GenericModal
        open={isPasswordPromptModalOpen}
        onClose={() => setIsPasswordPromptModalOpen(false)}
      >
        <PasswordPromptModal
          setIsPasswordPromptModalOpen={setIsPasswordPromptModalOpen}
          onConfirm={(loginToken) => handleEmailChange(loginToken)}
          oldEmail={oldEmailRef.current}
        />
      </GenericModal>
      <style jsx>{`
        .email-change-request-title {
          font-size: 1.38rem;
          color: var(--clr-neutral-800);
        }
        .email-change-request-description {
          font-size: 1rem;
          color: var(--clr-neutral-700);
        }
        .highlight {
          color: var(--clr-primary);
          font-weight: 600;
        }
        .email-resent {
          color: var(--clr-primary);
        }
      `}</style>
      {emailChanged && (
        <div className="email-change-request">
          <h2 className="email-change-request-title">
            Email Change Confirmation
          </h2>
          <p className="email-change-request-description">
            A confirmation email has been sent to your new email address (
            <span className="highlight">{emailRef.current}</span>). Please click
            the link in the email to confirm your new email address.
          </p>
          <div className="email-actions">
            {!emailResent && (
              <button
                onClick={() => {
                  handleResendEmail();
                }}
                className="button button_basic_long_on_light_bg "
              >
                Resend
              </button>
            )}
            {emailResent && <span className="email-resent">Email resent!</span>}
          </div>
        </div>
      )}

      {!emailChanged && !isLoading && (
        <>
          <CustomInput
            default={getClientInfo()?.Email || ""}
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
              onClick={handleClick}
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
