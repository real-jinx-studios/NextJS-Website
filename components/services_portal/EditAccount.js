import styles from "./services_portal.module.css";
import CustomInput from "../inputs/customInput";
import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { promiseResolver } from "../../lib/promiseResolver";
import Cookies from "js-cookie";
import LoaderDots from "../utils/loaderDots";
import { useClient } from "../../lib/context";
import customLog from "../utils/customLog";
export default function EditAccount({ session }) {
  //use cart state to get user info
  const [isLoading, setIsLoading] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const { getClientToken, logoutClient, getClientInfo } = useClient();

  // fetch user profile info with fewtch using POST method

  const emailRef = useRef();
  const usernameRef = useRef();
  const oldPass = useRef();
  const newPass = useRef();
  const newPassRe = useRef();
  const handleEmailChange = (e) => {
    setNewUserInfo({ ...newUserInfo, email: e.target.value });
  };
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return;
    }

    const [data, error] = await promiseResolver(
      fetch("/api/rest/WebSite/change-password", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: getClientToken(),
          PreviousPassword: oldPass.current.value,
          NewPassword: newPass.current.value,
        }),
      }),
      { endpoint: "change-password" }
    );
    if (error) {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.error(error.message);
      }
    } else if (data.status === 400) {
      const err = await data.json();

      if (err.error === "Invalid password") {
        customLog([]);
        setFormErrors({
          ...formErrors,
          PreviousPassword: "Invalid password",
        });
        setIsLoading(false);
        return;
      } else if (err.error === "Invalid token") {
        if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
          toast.error(err.error, {
            position: "bottom-right",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        }
        setIsLoading(false);
        logoutClient();
      }
    } else if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    } else if (data.status === 200) {
      toast.success("Password changed successfully!", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      //reset form fields
      oldPass.current.value = "";
      newPass.current.value = "";
      newPassRe.current.value = "";
    }
  };
  //check if form has any errors
  const checkFormForErrors = () => {
    const errorObject = {};
    if (oldPass.current.value === "") {
      errorObject.PreviousPassword = "Please enter your old password";
    }
    if (newPass.current.value == "") {
      errorObject.Password = "Please enter your new password";
    }
    if (newPassRe.current.value == "") {
      errorObject.RepeatPassword = "Please enter your new password again";
    } else if (newPass.current.value !== newPassRe.current.value) {
      errorObject.RepeatPassword = "Passwords must match";
    }

    setFormErrors(errorObject);
    return errorObject;
  };
  //  debugger;

  return (
    <div className={styles.content}>
      <div className={styles.title_wrapper}>
        <h2>Account Information</h2>
      </div>
      <div className={styles.content_inner_edit_account}>
        {!isLoading ? (
          <div className={styles.email_username_section}>
            <CustomInput
              default={getClientInfo().SiteUser}
              type="text"
              placeholder="Username"
              reference={usernameRef}
              isDisabled
            />
            <div className="email-wrapper">
              <style jsx>{`
                .email-wrapper {
                  margin-bottom: 1em;
                }
              `}</style>
              <CustomInput
                default={getClientInfo().Email}
                type="text"
                placeholder="Email"
                reference={emailRef}
              />{" "}
              <div className="email-actions">
                <button
                  onClick={handleEmailChange}
                  className="button button_basic_long_on_light_bg "
                >
                  Change email
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.content}>
            <LoaderDots />
          </div>
        )}
        <div className={styles.change_password_section}>
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <CustomInput
              reference={oldPass}
              type="password"
              placeholder="Old Password"
              formErrors={formErrors}
              name="PreviousPassword"
              setFormErrors={setFormErrors}
              isRequired
            />
            <CustomInput
              reference={newPass}
              repeatPasswordRef={newPassRe}
              type="password"
              isRegisterPassword={true}
              placeholder="New Password"
              formErrors={formErrors}
              name="Password"
              setFormErrors={setFormErrors}
              isRequired
            />
            <CustomInput
              reference={newPassRe}
              type="password"
              name="RepeatPassword"
              isRegisterPassword={true}
              isRepeatPassword={true}
              passwordReference={newPass}
              formErrors={formErrors}
              setFormErrors={setFormErrors}
              placeholder="Repeat New Password"
              isRequired
            />
            <button
              type="submit"
              className="button button_basic_long_on_light_bg "
            >
              Change password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
