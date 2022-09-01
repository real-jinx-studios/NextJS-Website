import { useState } from "react";
import VerifyEmail from "../info/VerifyEmail";
import ResetPasswordForm from "./ResetPasswordForm";
import RegisterForm from "./auth/RegisterForm";
import LoginForm from "./auth/LoginForm";
export default function AuthFormWarpper({ registrationType = "standard" }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [formState, setFormState] = useState("login");

  const handleFormStateChange = (stateName) => {
    setFormState(stateName);
  };

  const handleUsernameInput = (username) => {
    setUsernameInput(username);
  };

  if (formState === "verifyEmail") {
    return (
      <VerifyEmail
        usernameInput={usernameInput}
        setUsernameInput={setUsernameInput}
        handleFormStateChange={handleFormStateChange}
      />
    );
  }
  if (formState === "reset") {
    return <ResetPasswordForm handleFormStateChange={handleFormStateChange} />;
  }
  if (formState === "register") {
    return (
      <RegisterForm
        handleFormStateChange={handleFormStateChange}
        handleUsernameInput={handleUsernameInput}
        registrationType={registrationType}
      />
    );
  }
  return (
    <LoginForm
      handleFormStateChange={handleFormStateChange}
      destination="#"
      handleUsernameInput={handleUsernameInput}
    />
  );
}
