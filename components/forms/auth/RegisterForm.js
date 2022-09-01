import Link from "next/link";
import { Fragment, useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";
import styles from "../register_form.module.css";
import BillingInfoForm from "../BillingInfoForm";
import AccountInfoForm from "../AccountInfoForm";
import { promiseResolver } from "../../../lib/promiseResolver";
import { useRouter } from "next/router";
import CustomInput from "../../inputs/customInput";
import EducationalInstitutionForm from "./EducationalInstitutionForm";
import customLog from "../../utils/customLog";
export default function RegisterForm({
  handleFormStateChange,
  registrationType = "standard",
  handleUsernameInput,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const eduRef = useRef();
  const teacherRef = useRef();

  const [isStudent, setIsStudent] = useState(false);
  const [isRegister, setIsRegister] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  //make useRef const to attach to html input fields for registration billing details
  const legalNameRef = useRef();
  const contactNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const billingCountryRef = useRef();
  const billingCityRef = useRef();
  const vatRef = useRef();
  const billingAddressRef = useRef();
  const billingPostcodeRef = useRef();
  //make useRef const to attach to html input fields for registration account details
  const emailAddressRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const repeatPasswordRef = useRef();
  //make useRef const to attach to html input fields for policy
  const [reCAPTCHASuccess, setReCaptchaSuccess] = useState(false);
  const [policyCheck, setPolicyCheck] = useState(false);
  const router = useRouter();

  const handleCancelStudent = (e) => {
    setIsStudent(false);
  };
  const handleStudentChange = (e) => {
    setIsStudent(true);
  };

  const policyRef = useRef();
  const onReCAPTCHASuccess = (e) => {
    setReCaptchaSuccess(e);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return;
    }

    const formFields = {
      LegalName: legalNameRef.current.value,
      ContactName: firstNameRef.current.value + " " + lastNameRef.current.value,
      Country: billingCountryRef.current.value,
      Email: emailAddressRef.current.value,
      Username: usernameRef.current.value,
      Password: passwordRef.current.value,
      VerificationLink:
        "http://" +
        process.env.NEXT_PUBLIC_WEBSITE_HOST +
        "/user/activate-user?token=$activation_token$",
      RegType: "standard",
      Billing: {
        Address: billingAddressRef.current.value,
        PostCode: billingPostcodeRef.current.value,
        City: billingCityRef.current.value,
        VatID: vatRef.current.value,
      },
    };

    //remove keys that have empty values
    Object.keys(formFields).forEach((key) => {
      if (formFields[key] === "") {
        delete formFields[key];
      }
    });

    const [data, error] = await promiseResolver(
      fetch(
        `/api/rest/WebSite/register`,
        {
          method: "POST",
          body: JSON.stringify(formFields),
        },
        { endpoint: "register" }
      )
    );
    //check response for error object

    if (data.status === 400) {
      const responseFormErrors = await data.json();
      //iterate through error object and add fields
      const formErrorsTemp = {};
      responseFormErrors["input_errors"].forEach((error) => {
        formErrorsTemp[error["field-name"]] = error["error"];
      });

      setFormErrors(formErrorsTemp);
      setIsLoading(false);
      return;
    } else if (data.status === 200) {
      router.push(`/user/verify-email?userName=${usernameRef.current.value}`);
      setIsLoading(false);
    } else {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }
    setIsLoading(false);
  };

  const handleRegisterTrialAccountSubmit = async (e) => {
    e.preventDefault();
    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      return;
    }

    setIsLoading(true);
    if (isStudent) {
      const [data, error] = await promiseResolver(
        fetch(
          `/api/rest/WebSite/register-student`,
          {
            method: "POST",
            body: JSON.stringify({
              LegalName: legalNameRef.current.value,
              ContactName:
                firstNameRef.current.value + " " + lastNameRef.current.value,
              Country: billingCountryRef.current.value,
              Email: emailAddressRef.current.value,
              Username: usernameRef.current.value,
              Password: passwordRef.current.value,
              EducationalInstitution: eduRef.current.value,
              VerificationLink:
                "http://" +
                process.env.NEXT_PUBLIC_WEBSITE_HOST +
                "/user/activate-user?token=$activation_token$",
              Teacher: teacherRef.current.value,
            }),
          },
          { endpoint: "register student" }
        )
      );
      handleUsernameInput(usernameRef.current.value);
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.info("Registration request sent", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      //check response for error object
      if (data.status === 400) {
        const responseFormErrors = await data.json();
        //iterate through error object and add fields
        const formErrorsTemp = {};
        responseFormErrors["input_errors"].forEach((error) => {
          formErrorsTemp[error["field-name"]] = error["error"];
        });

        setFormErrors(formErrorsTemp);
        setIsLoading(false);
        return;
      } else if (data.status === 200) {
        handleFormStateChange("verifyEmail");
      } else {
        router.replace({
          pathname: "/500",
          query: { err: "internal server error" },
        });
      }

      setIsLoading(false);
      return;
    }

    const [data, error] = await promiseResolver(
      fetch(
        `/api/rest/WebSite/register`,
        {
          method: "POST",
          body: JSON.stringify({
            LegalName: legalNameRef.current.value,
            ContactName:
              firstNameRef.current.value + " " + lastNameRef.current.value,
            Country: billingCountryRef.current.value,
            Email: emailAddressRef.current.value,
            Username: usernameRef.current.value,
            Password: passwordRef.current.value,
            VerificationLink:
              "http://" +
              process.env.NEXT_PUBLIC_WEBSITE_HOST +
              "/user/activate-user?token=$activation_token$",
            RegType: "trial",
          }),
        },
        { endpoint: "register" }
      )
    );
    handleUsernameInput(usernameRef.current.value);
    if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
      toast.info("Registration request sent", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }

    //check response for error object
    if (data.status === 400) {
      const responseFormErrors = await data.json();

      customLog(responseFormErrors);

      //iterate through error object and add fields
      const formErrorsTemp = {};
      responseFormErrors["input_errors"].forEach((error) => {
        formErrorsTemp[error["field-name"]] = error["error"];
      });

      setFormErrors(formErrorsTemp);
      setIsLoading(false);
      return;
    } else if (data.status === 200) {
      handleFormStateChange("verifyEmail");
    } else {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }

    setIsLoading(false);
  };
  console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, "site key");

  //check if form has any errors
  const checkFormForErrors = () => {
    const errorObject = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (legalNameRef.current.value == "") {
      errorObject.LegalName = "Please enter your legal name";
    }
    if (firstNameRef.current.value == "") {
      errorObject.FirstName = "Please enter your first name";
    }
    if (lastNameRef.current.value == "") {
      errorObject.LastName = "Please enter your last name";
    }
    if (billingCountryRef?.current.value == "") {
      errorObject.Country = "Please enter your billing country";
    }
    if (emailAddressRef.current.value == "") {
      errorObject.Email = "Please enter your email address";
    } else if (!regex.test(emailAddressRef.current.value)) {
      errorObject.Email = "Email not valid";
    }
    if (usernameRef.current.value == "") {
      errorObject.Username = "Please enter your username";
    }
    if (passwordRef.current.value == "") {
      errorObject.Password = "Please enter your password";
    }
    if (repeatPasswordRef.current.value == "") {
      errorObject.RepeatPassword = "Please enter your password again";
    }
    if (passwordRef.current.value !== repeatPasswordRef.current.value) {
      errorObject.RepeatPassword = "Passwords do not match";
    }
    if (eduRef?.current?.value == "") {
      errorObject.EducationalInstitution =
        "Please enter your educational institution";
    }
    if (teacherRef?.current?.value == "") {
      errorObject.Teacher = "Please enter your teacher";
    }
    if (!policyCheck) {
      errorObject.Policy = "Please agree to the policy";
    }
    if (!reCAPTCHASuccess) {
      errorObject.ReCAPTCHA = "Please verify that you are not a robot";
    }

    setFormErrors(errorObject);
    return errorObject;
  };

  if (registrationType === "trial") {
    return (
      <div className="container">
        {" "}
        <form
          className={styles.form}
          onSubmit={handleRegisterTrialAccountSubmit}
          data-before-title="REGISTER"
          data-after-title="TRIAL"
        >
          <div className={styles.title__section}>
            <p className={styles.title__section_p}>Create new account</p>
            <p className={styles.title__section_p_subtext}>
              Already have and account?{" "}
              <a
                className={styles.title__section_a}
                onClick={() => handleFormStateChange("login")}
              >
                Log in
              </a>
            </p>
          </div>
          <div className={styles.form_section_wrapper}>
            <div className={styles.form_section_title_wrapper} step-number="1">
              <h3 className={styles.section_title}>Personal Details</h3>
            </div>
            <BillingInfoForm
              references={{
                legalNameRef: legalNameRef,
                contactNameRef: contactNameRef,
                firstNameRef: firstNameRef,
                lastNameRef: lastNameRef,
                billingCountryRef: billingCountryRef,
              }}
              requiredFields={[
                "LegalName",
                "FirstName",
                "LastName",
                "ContactName",
                "Email",
                "Country",
              ]}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              isRegister={isRegister}
              registrationType={registrationType}
            />
            <AccountInfoForm
              references={{
                emailAddressRef,
                usernameRef,
                passwordRef,
                repeatPasswordRef,
              }}
              requiredFields={[
                "Email",
                "Username",
                "Password",
                "RepeatPassword",
              ]}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              isRegister={isRegister}
              registrationType={registrationType}
            />
          </div>
          <div className={styles.form_section_wrapper}>
            <div className={styles.form_section_title_wrapper} step-number="2">
              <h3 className={styles.section_title}>
                University/Educational Institution{" "}
                {!isStudent ? (
                  <small className="small">(optional)</small>
                ) : (
                  <small className="small2">
                    (you are now registering for a student account)
                  </small>
                )}
              </h3>
            </div>
            <div className={`${styles.input_wrapper} gap`}>
              <style jsx>
                {`
                  .gap {
                    margin-bottom: 1.5em;
                  }
                `}
              </style>
              <CustomInput
                type="radio"
                placeholder="Register for student license"
                isRequired
                name="Teacher"
                checked={isStudent}
                formErrors={formErrors}
                setFormErrors={setFormErrors}
                isRegister={isRegister}
                handleChange={handleStudentChange}
              />
              {isStudent && (
                <div className="cancel_custom_wrapper">
                  <div className="cancel_custom" onClick={handleCancelStudent}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="cancel_icon"
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
                    <span className="cancel_text">Cancel</span>
                  </div>
                </div>
              )}
            </div>
            {isStudent && (
              <div className={styles.input_wrapper}>
                <EducationalInstitutionForm
                  references={{ eduRef, teacherRef }}
                  setFormErrors={setFormErrors}
                  formErrors={formErrors}
                  isRegister={isRegister}
                  registrationType={registrationType}
                  requiredFields={["EducationalInstitution", "Teacher"]}
                />
              </div>
            )}
          </div>

          <div className={styles.form_section_wrapper}>
            <style jsx>
              {`
                .privacy {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  gap: 1.5em;
                }
                a {
                  color: var(--clr-primary);
                }
              `}
            </style>
            <div className={styles.form_section_title_wrapper} step-number="3">
              <h3 className={styles.section_title}>Accept Privacy Policy:</h3>
            </div>
            <div className="privacy">
              <div className={styles}>
                <div>
                  <input
                    ref={policyRef}
                    type="checkbox"
                    id="policy"
                    onChange={(e) => setPolicyCheck(e.target.checked)}
                  />
                  <label htmlFor="policy">
                    &nbsp;&nbsp; I agree that my data will be processed
                    according to the{" "}
                    <Link href="/legal/policy">
                      <a>Privacy Policy</a>
                    </Link>
                    .
                  </label>
                </div>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHASuccess}
              />
              <div className="">
                {!isLoading ? (
                  <Fragment>
                    <button
                      className={
                        policyCheck && reCAPTCHASuccess
                          ? "button"
                          : "button button_disabled"
                      }
                      type="submit"
                    >
                      REGISTER
                    </button>
                  </Fragment>
                ) : (
                  <div className={styles.loader_wrapper}>
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
  return (
    <div>
      <style jsx>{`
        .section_title {
          font-size: 1.3rem;
          color: var(--clr-neutral-800);
          margin-bottom: var(--offset-4);
        }
        .shit {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.5em;
        }
        a {
          color: var(--clr-primary);
        }
      `}</style>
      <div className="container">
        <form
          className={styles.form}
          onSubmit={handleRegisterSubmit}
          data-before-title="REGISTER"
          data-after-title="STERREGI"
        >
          <div className={styles.title__section}>
            <p className={styles.title__section_p}>Create new account</p>
            <p className={styles.title__section_p_subtext}>
              Already have and account?{" "}
              <a
                className={styles.title__section_a}
                onClick={() => handleFormStateChange("login")}
              >
                Log in
              </a>
            </p>
          </div>
          <div className={styles.form_section_wrapper}>
            <div className={styles.form_section_title_wrapper} step-number="1">
              <h3 className="section_title">Billing Details</h3>
            </div>
            <BillingInfoForm
              references={{
                legalNameRef: legalNameRef,
                contactNameRef: contactNameRef,
                firstNameRef: firstNameRef,
                lastNameRef: lastNameRef,
                billingCountryRef: billingCountryRef,
                billingCityRef: billingCityRef,
                vatRef: vatRef,
                billingAddressRef: billingAddressRef,
                billingPostcodeRef: billingPostcodeRef,
              }}
              requiredFields={[
                "LegalName",
                "FirstName",
                "LastName",
                "ContactName",
                "Country",
                "LegalName",
                "Country",
              ]}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              isRegister={true}
              registrationType={registrationType}
            />
          </div>
          <div className={styles.form_section_wrapper}>
            <div className={styles.form_section_title_wrapper} step-number="2">
              <h3 className="section_title">Personal Details</h3>
            </div>
            <AccountInfoForm
              references={{
                emailAddressRef,
                usernameRef,
                passwordRef,
                repeatPasswordRef,
              }}
              requiredFields={[
                "Email",
                "Username",
                "Password",
                "RepeatPassword",
              ]}
              setFormErrors={setFormErrors}
              formErrors={formErrors}
              isRegister={true}
            />
          </div>

          <div className={styles.form_section_wrapper}>
            <div className={styles.form_section_title_wrapper} step-number="3">
              <h3 className="section_title">Accept Privacy Policy:</h3>
            </div>
            <div className="shit">
              <div className={styles}>
                <div>
                  <input
                    ref={policyRef}
                    type="checkbox"
                    id="policy"
                    onChange={(e) => setPolicyCheck(e.target.checked)}
                  />
                  <label htmlFor="policy">
                    &nbsp;&nbsp; I agree that my data will be processed
                    according to the{" "}
                    <Link href="/legal/policy">
                      <a>Privacy Policy</a>
                    </Link>
                    .
                  </label>
                  {formErrors["Policy"] && (
                    <p className="error">{formErrors["Policy"]}</p>
                  )}
                </div>
              </div>
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHASuccess}
              />
              {formErrors["ReCAPTCHA"] && (
                <p className="error">{formErrors["ReCAPTCHA"]}</p>
              )}

              {Object.keys(formErrors).length > 0 ? (
                <label className="error">
                  There are some errors in your form
                </label>
              ) : null}
              <div className="">
                {!isLoading ? (
                  <Fragment>
                    <button
                      className={
                        policyCheck && reCAPTCHASuccess
                          ? "button"
                          : "button button_disabled"
                      }
                      type="submit"
                    >
                      REGISTER
                    </button>
                  </Fragment>
                ) : (
                  <div className={styles.loader_wrapper}>
                    <Loader />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
