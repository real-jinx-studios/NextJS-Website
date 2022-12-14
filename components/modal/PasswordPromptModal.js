import { useEffect, useRef, useState } from "react";
import FancyLoader from "../utils/FancyLoader";
import CustomInput from "../inputs/customInput";
import { useClient } from "../../lib/context";
import PasswordInput from "../inputs/PasswordInput";
export default function PasswordPromptModal({
  setIsPasswordPromptModalOpen,
  onConfirm,
  oldEmail,
}) {
  const passwordRef = useRef();
  const { verifyPassword } = useClient();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);
  const handleClick = async () => {
    setLoading(true);
    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setLoading(false);
      return;
    }

    const res = await verifyPassword(oldEmail, passwordRef.current.value);

    if (res.status === 400 || res.status === 401) {
      setInvalidPassword(true);
      setLoading(false);
      return;
    }

    onConfirm(res.loginToken);
    setIsPasswordPromptModalOpen(false);
  };

  const checkFormForErrors = () => {
    const errorObject = {};

    if (passwordRef.current.value == "") {
      errorObject.Password = "Please enter your password";
    }

    setFormErrors(errorObject);
    return errorObject;
  };
  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  useEffect(() => {
    console.log("PasswordPromptModal mounted", formErrors);
  }, [formErrors]);
  return (
    <div className=" flex-center-center-column">
      <style jsx>{`
        .modal-title {
          font-size: 1.38rem;
          font-weight: 400;
          color: var(--clr-neutral-800);
        }
        .modal-subtitle {
          font-size: 1rem;
          color: var(--clr-neutral-700);
        }
        .modal-inputs {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .modal-actions {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
        }
        .invalid-password {
          color: var(--clr-warn);
        }
      `}</style>
      <h2 className="modal-title">Confirm Password</h2>
      <p className="modal-subtitle">Please confirm your password to continue</p>
      <div className="modal-body">
        <div className="modal-inputs">
          {invalidPassword && (
            <h3 className="invalid-password">Invalid password</h3>
          )}

          <PasswordInput
            type="password"
            placeholder="Password"
            name="Password"
            reference={passwordRef}
            setFormErrors={setFormErrors}
            formErrors={formErrors}
            isRequired={true}
          />
        </div>

        <div className="modal-actions">
          {!loading && (
            <button
              onClick={handleClick}
              className="button button_basic_long_on_light_bg"
            >
              Submit
            </button>
          )}
          {loading && <FancyLoader />}
        </div>
      </div>
    </div>
  );
}
