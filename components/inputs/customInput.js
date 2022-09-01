import { useEffect, useState, useCallback, useContext } from "react";
import debounce from "lodash.debounce";
import styles from "./input.module.css";
import LoaderDots from "../utils/loaderDots";
import { cartState, readState } from "../../lib/cartContext";
import customLog from "../utils/customLog";
import priceFormatter from "../utils/priceFormatter";
import sanitizeVAT from "../../lib/sanitizeVAT";

export default function CustomInput(props) {
  let { reference, isCustomPrice, formErrors = {}, setFormErrors } = props;

  const [priceValue, setPriceValue] = useState(props.default);
  const [defaultInputError, setDefaultInputError] = useState({});

  const [defaultInputValue, setDefaultInputValue] = useState(
    props.default || ""
  );
  const handleDefalutInputChange = (e) => {
    let inputValue = e.target.value;
    const name = props.name;

    //set defaultInput error object
    let inputErrorObject = {};
    if (inputValue === "") {
      inputErrorObject.empty = "Field cannot be empty";
    }

    setDefaultInputValue(inputValue);
    setDefaultInputError(inputErrorObject);
    //check if default input has errors and remove name error key if it does not

    if (Object.keys(inputErrorObject).length > 0) {
      setFormErrors({
        ...props.formErrors,
        [name]: inputErrorObject.empty,
      });
    } else {
      setFormErrors((currentFormErrors) => {
        //remove name error key if it exists
        if (currentFormErrors[name]) {
          delete currentFormErrors[name];
        }
        return currentFormErrors;
      });
    }
  };
  //VAT input component
  if (props.special === "vat") {
    return <VAT props={props} />;
  }

  //RADIO input component
  if (props.type === "radio") {
    return (
      <label className={styles.radio_input_wrapper}>
        <input
          type="radio"
          className={styles.radio_input}
          name={props.name}
          value={props.default}
          id={props.id}
          ref={reference}
          checked={props.checked}
          disabled={props.isDisabled}
          onChange={props.handleChange}
        />
        <div className={styles.radio_input_circle}></div>
        <div className={styles.radio_input_text}>{props.placeholder}</div>
      </label>
    );
  }

  //password input component
  if (props.type === "password") {
    return <Password props={props} />;
  }

  //default input component
  return (
    <div className={styles.input_wrapper}>
      <style jsx>{`
        .error_icon_wrapper {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: 3%;
          top: 23px;
          transform: translateY(-50%);
        }
        .error_list_wrapper {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: 1rem;
        }
        .error_list {
        }
        .error_list i {
          margin-right: 5px;
          color: var(--clr-neutral-800);
        }
        .error_list_item {
          color: var(--clr-neutral-800);
          font-size: var(--font-size-small);
          margin-bottom: var(--spacing-small);
        }
        .failed {
          color: var(--clr-warn) !important;
        }
      `}</style>
      <input
        name={props.name}
        ref={reference}
        type={props.type}
        className={`${styles.input} ${props.isDisabled ? styles.disabled : ""}`}
        id={props.id}
        placeholder={
          props.isRequired ? props.placeholder + "*" : props.placeholder
        }
        defaultValue={props.default}
        value={props.value}
        disabled={props.isDisabled}
        onClick={props.handleClick}
        onBlur={props.handleBlur}
        onFocus={props.handleFocus}
        onChange={(e) => {
          //run only if register
          if (props.isRegister) {
            handleDefalutInputChange(e);
          } else {
            setDefaultInputValue(e.target.value);
          }
          if (props.handleChange) {
            props.handleChange(e);
          }
        }}
      />
      <label htmlFor={props.id} className={styles.input_label}>
        {props.placeholder}
        {props.isRequired && "*"}
      </label>
      <div className="error_list_wrapper">
        {props.isRequired && formErrors[props.name] && (
          <ul className="error_list">
            <li className={"error_list_item failed"}>
              <i className="fas fa-times failed"></i>
              {formErrors[props.name]}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

function DefaultInput(props) {
  let { reference, isCustomPrice, formErrors = {}, setFormErrors } = props;
}

function Password({ props }) {
  let { reference, isCustomPrice, formErrors = {} } = props;

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

  if (props.isRegisterPassword) {
    customLog([{ passwordError, formErrors }, props.name]);
  }

  return (
    <div className={styles.input_wrapper}>
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
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: 1rem;
        }
        .password_requirements_list {
        }
        .password_requirements_list i {
          margin-right: 5px;
          color: var(--clr-neutral-800);
        }
        .password_requirements_list_item {
          color: var(--clr-neutral-800);
          font-size: var(--font-size-small);
          margin-bottom: var(--spacing-small);
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
      `}</style>
      <input
        name={props.name}
        ref={props.reference}
        type={showPassword ? "text" : "password"}
        className={`${styles.input} ${props.isDisabled ? styles.disabled : ""}`}
        id={props.id}
        placeholder={
          props.isRequired ? props.placeholder + "*" : props.placeholder
        }
        defaultValue={props.default}
        value={passwordValue}
        disabled={props.isDisabled}
        onBlur={props.onBlur}
        onChange={(e) => {
          setPasswordValue(e.target.value);
          handlePasswordChange(e);
          props.handleChange;
        }}
      />
      <label htmlFor={props.id} className={styles.input_label}>
        {props.placeholder} {props.isRequired && "*"}
      </label>
      <div className="password_icon_wrapper">
        <div
          className="password_icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <i className="fas fa-eye-slash"></i>
          ) : (
            <i className="fas fa-eye"></i>
          )}
        </div>
      </div>
      <div className="password_requirements_list_wrapper">
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
                    <i className="fas fa-times failed"></i>
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

function VAT({ props }) {
  const { dispatch } = cartState();
  const [isVatValid, setIsVatValid] = useState(false);
  const [isVatValidating, setIsVatValidating] = useState(false);
  const [vatValue, setVatValue] = useState(props.default || "");

  const handleVatChange = (e) => {
    setVatValue(e.target.value);
  };

  const checkVat = useCallback(
    debounce(async (vatNumber, countryObject) => {
      if (vatNumber !== undefined && vatNumber !== "") {
        const vatValueTemp = sanitizeVAT(vatNumber);

        const response = await fetch("/api/dev/vat", {
          method: "POST",
          body: JSON.stringify({
            vat: vatValueTemp,
            countryCode: countryObject.vatCode,
          }),

          ContentType: "application/json",
        });

        const isValid = await response.json();

        if (isValid?.valid) {
          setIsVatValid(true);
        } else {
          setIsVatValid(false);
        }
        setIsVatValidating(false);
        dispatch({
          type: "SET_VAT",
          payload: {
            vat: {
              isValid: isValid?.valid || false,
              vatNumber: vatValueTemp || "",
            },
          },
        });
        return;
      }
      setIsVatValidating(false);
    }, 500),
    []
  );

  useEffect(() => {
    setIsVatValidating(true);
    checkVat(vatValue, props.country);
  }, [vatValue, props.country]);

  if (!props.country.isVat) {
    return (
      <>
        <input
          ref={props.reference}
          type={props.type}
          className={`${styles.input} ${true ? styles.disabled : ""}`}
          id={props.id}
          placeholder={props.placeholder}
          value=""
          disabled={true}
        />
        <div className={styles.input_disabled}>
          <i className="fas fa-info-circle"></i>
          <span>VAT is not applicable for this country.</span>
        </div>
      </>
    );
  }
  return (
    <div className={styles.input_wrapper}>
      <input
        ref={props.reference}
        type={props.type}
        className={`${styles.input} ${props.isDisabled ? styles.disabled : ""}`}
        id={props.id}
        placeholder={
          props.isRequired ? props.placeholder + "*" : props.placeholder
        }
        value={vatValue}
        onChange={handleVatChange}
        disabled={
          props.countryReference?.current?.selectedOptions[0]?.dataset
            ?.isVat === "false"
        }
      />

      <label htmlFor={props.id} className={styles.input_label}>
        {props.placeholder} {props.isRequired ? "*" : ""}
        {isVatValidating && (
          <small className={styles.pending}>
            &nbsp;&nbsp;(VERIFYING) &nbsp;
            <LoaderDots size="s" color="warning" />
          </small>
        )}
        {isVatValid === false && !isVatValidating && (
          <small className={styles.not_valid}>&nbsp;&nbsp;(NOT VALID)</small>
        )}
        {isVatValid === true && !isVatValidating && (
          <small className={styles.valid}>&nbsp;&nbsp;(VALID)</small>
        )}
      </label>
      <div className={styles.vat_check} onClick={handleVatChange}>
        {(isVatValid === undefined || vatValue === "") && !isVatValidating && (
          <LoaderDots />
        )}
        {isVatValidating && vatValue !== "" && (
          <LoaderDots size="ms" color="warning" />
        )}

        {isVatValid === true && !isVatValidating && vatValue !== "" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.vat_check_icon_verified}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {isVatValid === false && !isVatValidating && vatValue !== "" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.vat_check_icon_failed}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </div>
    </div>
  );
}
