import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "../services_portal.module.css";
import CustomInput from "../../inputs/customInput";
import FancyLoader from "../../utils/FancyLoader";
import { useClient } from "../../../lib/context";

export default function ChangePassword() {
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [passwordFormKey, setPasswordFormKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { changePassword } = useClient();

  const oldPass = useRef();
  const newPass = useRef();
  const newPassRe = useRef();
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
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return;
    }

    const res = await changePassword(
      oldPass.current.value,
      newPass.current.value
    );

    if (res.status === 400 && res.message === "Invalid password") {
      setFormErrors({
        ...formErrors,
        PreviousPassword: "Invalid password",
      });
      setIsLoading(false);
      setPasswordFormKey(passwordFormKey + 1);
      return;
    } else if (res.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    } else if (res.status === 200) {
      toast.success("Password changed successfully!", {
        position: "bottom-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setIsLoading(false);
      setPasswordChanged(true);
      setPasswordFormKey(passwordFormKey + 1);
    }
  };
  return (
    <div className={styles.change_password_section}>
      <style jsx>{`
        .password-change-overlay {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 100%;
          right: 0;
          z-index: 2;
          background-color: rgba(0, 0, 0, 0.5);
        }
        .password-change-overlay.active {
          bottom: 0;
        }

        .password-success-overlay-box {
          position: fixed;
          z-index: 3;
          background-color: var(--clr-correct);
        }
        .password-success-title {
          font-size: 1.5em;
          color: var(--clr-correct);
        }
      `}</style>
      <h3>Change Password</h3>
      {passwordChanged && (
        <div className={styles.password_success_overlay_box}>
          <div className={styles.password_success_overlay_box_inner}>
            <h3 className="password-success-title">
              Password changed successfully!
            </h3>
            <button
              onClick={() => {
                setPasswordChanged(false);
                setPasswordFormKey(passwordFormKey + 1);
              }}
              className="button button_basic_long_on_light_bg "
            >
              Change Again
            </button>
          </div>
        </div>
      )}

      {!passwordChanged && !isLoading && (
        <form onSubmit={handlePasswordChange} key={passwordFormKey}>
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
      )}
      {!passwordChanged && isLoading && (
        <FancyLoader size="150" fontSize="1.25" />
      )}
    </div>
  );
}
