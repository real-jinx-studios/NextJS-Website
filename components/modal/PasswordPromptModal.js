import { useRef, useState } from "react";
import CustomInput from "../inputs/customInput";
export default function PasswordPromptModal({
  setIsPasswordPromptModalOpen,
  onConfirm,
}) {
  const passwordRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const handleClick = () => {
    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      return;
    }
    console.log(onConfirm);

    onConfirm(passwordRef.current.value);
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
      `}</style>
      <h2 className="modal-title">Confirm Password</h2>
      <p className="modal-subtitle">Please confirm your password to continue</p>
      <div className="modal-body">
        <div className="modal-inputs">
          <CustomInput
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
          <button
            onClick={handleClick}
            className="button button_basic_long_on_light_bg"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
