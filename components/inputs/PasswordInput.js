import { useEffect, useState } from "react";
import styles from "./custom-input.module.css";
export default function PasswordInput(props) {
  const { formErrors = {} } = props;
  const [fieldValue, setFieldValue] = useState(
    props.default || props.value || ""
  );
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState({});
  const [passwordValue, setPasswordValue] = useState(props.default || "");
  useEffect(() => {
    //set password error from form errors to local state
    if (formErrors[props.name]) {
      setPasswordError((passErrors) => {
        return {
          ...passErrors,
          [props.name]: formErrors[props.name],
        };
      });
    }
  }, [formErrors]);

  const handlePasswordChange = (e) => {
    let passwordInputValue = e.target.value;

    //set password error object
    let passwordErrorObject = {};
    if (!props.isRepeatPassword) {
      if (passwordInputValue.length < 8) {
        passwordErrorObject.length = "Password must be at least 8 characters";
      }
      if (!passwordInputValue.match(/[a-z]/)) {
        passwordErrorObject.lowercase =
          "Password must contain at least one lowercase letter";
      }
      if (!passwordInputValue.match(/[A-Z]/)) {
        passwordErrorObject.uppercase =
          "Password must contain at least one uppercase letter";
      }
      if (!passwordInputValue.match(/[0-9]/)) {
        passwordErrorObject.number =
          "Password must contain at least one number";
      }
      if (!passwordInputValue.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) {
        passwordErrorObject.special =
          "Password must contain at least one special character";
      }
    }
    if (props.isRepeatPassword) {
      if (passwordInputValue !== props.passwordReference.current.value) {
        passwordErrorObject.match = "Passwords must match";
      }
    }
    if (props.repeatPasswordRef) {
      if (props.repeatPasswordRef.current.value !== passwordInputValue) {
        passwordErrorObject.match = "Passwords must match";
      }
    }

    setPasswordValue(passwordInputValue);
    setPasswordError(passwordErrorObject);
    //check if password has errors and remove password error key if it does not
    if (props.isRegisterPassword) {
      if (Object.keys(passwordErrorObject).length > 0) {
        props.setFormErrors({
          ...props.formErrors,

          RepeatPassword: passwordErrorObject["match"]
            ? "Passwords must match"
            : "",
        });
      } else {
        props.setFormErrors((currentFormErrors) => {
          let newFormErrors = { ...currentFormErrors };
          delete newFormErrors[props.name];
          delete newFormErrors.RepeatPassword;
          return newFormErrors;
        });
      }
    }
  };
  useEffect(() => {
    if (typeof props.formErrors === "object") {
      setHasError(props.isRequired && props.formErrors[props.name]);
      setErrorMessage(props.formErrors[props.name]);
    }
  }, [props.formErrors]);

  return (
    <div className={styles["form-layout-autocomplete"]}>
      <style jsx>{`
        .password_icon_wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 3%;
          top: 23px;
          transform: translateY(-50%);
        }
        .password_requirements_list_wrapper {
          display: none;

          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          margin-top: 0.47059rem;
          margin-bottom: var(--margin-bottom-input, 0.82353rem);
        }
        .password_requirements_list_wrapper.show {
          display: flex;
        }
        .password_requirements_list {
        }
        .password_requirements_list i {
          margin-right: 5px;
          color: var(--clr-neutral-800);
        }
        .password_requirements_list_item {
          font-size: 14px;
          line-height: 1.37;
          font-weight: 400;
          letter-spacing: -0.01em;
          display: flex;
          position: relative;
        }
        .neutral {
          color: var(--clr-neutral-700) !important;
        }
        .checked {
          color: var(--clr-correct) !important;
        }
        .failed {
          color: var(--clr-warn) !important;
        }
        .fas {
          font-family: var(--ff-icons);
        }
        .fas.failed::before {
          content: "\e5cd";
        }
        .fas.checked::before {
          content: "\e876";
        }
        .fas.neutral::before {
          content: "\e5d4";
        }
        .visibility_off,
        .visibility {
          font-size: 2rem;
          line-height: 2rem;
          font-family: var(--ff-icons);
        }
        .visibility_off::before {
          content: "\e8f5";
        }
        .visibility::before {
          content: "\e8f4";
        }
      `}</style>
      <div className={styles["form-textbox"]}>
        <input
          className={`${styles["text-input"]}
           ${
             props.isRequired &&
             formErrors[props.name] &&
             passwordValue.length === 0
               ? styles["is-error"]
               : ""
           } 
          ${styles["button-space"]} ${
            passwordValue !== "" ? styles["text-input-has-entered"] : ""
          }
          ${
            props.isRegisterPassword && passwordValue !== ""
              ? styles["password-register-input-entered"]
              : ""
          }
         
          `}
          name={props.name}
          type={showPassword ? "text" : "password"}
          ref={props.reference}
          value={props.value}
          defaultValue={props.default}
          disabled={props.isDisabled}
          onClick={props.handleClick}
          onBlur={props.onBlur}
          onChange={(e) => {
            setPasswordValue(e.target.value);
            handlePasswordChange(e);
            props.handleChange;
          }}
        />
        <label className={styles["placeholder-label"]} aria-hidden="true">
          {props.isRequired ? "*" + props.placeholder : props.placeholder}
        </label>

        <span
          className={styles["button"]}
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? (
            <span className="visibility_off"></span>
          ) : (
            <span className="visibility"></span>
          )}
        </span>

        {hasError && passwordValue === "" && (
          <div className={styles["input-field-message-wrapper"]}>
            <span
              className={`${styles["input-field-message"]} ${
                hasError ? styles["input-field-error"] : ""
              }`}
            >
              {errorMessage}
            </span>
          </div>
        )}
      </div>
      <div className={styles["autocomplete"]}></div>
      <div
        className={`password_requirements_list_wrapper ${
          props.isRegisterPassword && passwordValue !== "" ? "show" : ""
        }`}
      >
        {props.isRequired &&
          formErrors[props.name] &&
          passwordValue.length === 0 && (
            <ul className="password_requirements_list">
              <li className={"password_requirements_list_item failed"}>
                <i className="fas fa-times failed"></i>
                {formErrors[props.name]}
              </li>
            </ul>
          )}
        {props.isRequired &&
          formErrors[props.name] &&
          props.name === "PreviousPassword" &&
          passwordValue.length !== 0 && (
            <ul className="password_requirements_list">
              <li className={"password_requirements_list_item failed"}>
                <i className="fas fa-times failed"></i>
                {formErrors[props.name]}
              </li>
            </ul>
          )}
        {props.isRegisterPassword && passwordValue.length > 0 && (
          <ul className="password_requirements_list">
            {props.isRepeatPassword ? (
              <li
                className={`password_requirements_list_item ${
                  passwordValue.length > 0
                    ? formErrors[props.name] === "Passwords must match"
                      ? "failed"
                      : "checked"
                    : "neutral"
                }`}
              >
                {passwordValue.length > 0 ? (
                  formErrors[props.name] === "Passwords must match" ? (
                    <>
                      {" "}
                      <i className="fas fa-times failed"></i>
                    </>
                  ) : (
                    <i className="fas fa-check checked"></i>
                  )
                ) : (
                  <i className="fas fa-minus neutral"></i>
                )}
                {formErrors[props.name] === "Passwords must match"
                  ? "Passwords do not match"
                  : "Passwords match"}
              </li>
            ) : (
              <>
                <li
                  className={`password_requirements_list_item ${
                    passwordValue.length > 0
                      ? !passwordError["length"]
                        ? "checked"
                        : "failed"
                      : "neutral"
                  }`}
                >
                  {passwordValue.length > 0 ? (
                    !passwordError["length"] ? (
                      <i className="fas fa-check checked"></i>
                    ) : (
                      <i className="fas fa-times failed"></i>
                    )
                  ) : (
                    <i className="fas fa-minus neutral"></i>
                  )}
                  8 characters minimum
                </li>
                <li
                  className={`password_requirements_list_item ${
                    passwordValue.length > 1
                      ? !passwordError["uppercase"]
                        ? "checked"
                        : "failed"
                      : "neutral"
                  }`}
                >
                  {passwordValue.length > 1 ? (
                    !passwordError["uppercase"] ? (
                      <i className="fas fa-check checked"></i>
                    ) : (
                      <i className="fas fa-times failed"></i>
                    )
                  ) : (
                    <i className="fas fa-minus neutral"></i>
                  )}
                  1 uppercase letter
                </li>
                <li
                  className={`password_requirements_list_item ${
                    passwordValue.length > 1
                      ? !passwordError["lowercase"]
                        ? "checked"
                        : "failed"
                      : "neutral"
                  }`}
                >
                  {passwordValue.length > 1 ? (
                    !passwordError["lowercase"] ? (
                      <i className="fas fa-check checked"></i>
                    ) : (
                      <i className="fas fa-times failed"></i>
                    )
                  ) : (
                    <i className="fas fa-minus neutral"></i>
                  )}
                  1 lowercase letter
                </li>
                <li
                  className={`password_requirements_list_item ${
                    passwordValue.length > 1
                      ? !passwordError["number"]
                        ? "checked"
                        : "failed"
                      : "neutral"
                  }`}
                >
                  {passwordValue.length > 1 ? (
                    !passwordError["number"] ? (
                      <i className="fas fa-check checked"></i>
                    ) : (
                      <i className="fas fa-times failed"></i>
                    )
                  ) : (
                    <i className="fas fa-minus neutral"></i>
                  )}
                  1 number
                </li>
                <li
                  className={`password_requirements_list_item ${
                    passwordValue.length > 1
                      ? !passwordError["special"]
                        ? "checked"
                        : "failed"
                      : "neutral"
                  }`}
                >
                  {passwordValue.length > 1 ? (
                    !passwordError["special"] ? (
                      <i className="fas fa-check checked"></i>
                    ) : (
                      <i className="fas fa-times failed"></i>
                    )
                  ) : (
                    <i className="fas fa-minus neutral"></i>
                  )}
                  1 special character
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
