import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cookies from "js-cookie";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { cartState } from "./cartContext";
const ClientContext = createContext({});

export function useClient() {
  return useContext(ClientContext);
}

export function ClientProvider({ children }) {
  const [user, setUser] = useSessionStorage("user", {});
  const [clientToken, setClientToken] = useState(Cookies.get("uat") || null);
  const [clientData, setClientData] = useState(null);
  const [isClientVerified, setIsClientVerified] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const { dispatch } = cartState();

  async function getFullClientInfo() {
    if (isFetchingUser) return;
    console.log("fetching user");
    setIsFetchingUser(true);
    const res = await fetch("/api/rest/WebSite/get-customer-info", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: getClientToken(),
        GetSAInfo: true,
        GetLicInfo: true,
      }),
    });
    if (res.status === 400) {
      logoutClient();
      return null;
    }
    const data = await res.json();

    setClientData(data);

    updateLastCheckedAndData({ uInfo: data, isVerified: true });
    setIsFetchingUser(false);
    return data;
  }

  function getClientInfo() {
    if (!clientData) {
      if (user?.uInfo) {
        //maybe make a calls to get the full client info here that is non blocking
        setClientData((prev) => ({
          ...prev,
          ...user.uInfo,
        }));
        return user.uInfo;
      }
    }
    return clientData;
  }
  function setClientInfo(data) {
    setClientData(data);
  }

  async function updateClientInfo(newClientData) {
    const res = await fetch("/api/rest/WebSite/update-billing-info", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: clientToken,
        ...newClientData,
      }),
    });
    let data;
    if (res.status === 400) {
      data = await res.json();
      if (data.error) {
        return { status: 400, message: data.error };
      }
      if (data.error === "Invalid token") {
        logoutClient();
        return null;
      }
      return { status: 400, message: "Something went wrong" };
    }
    console.log("updated client info", newClientData);
    const clientDataToUpdate = {
      ...newClientData,
    };
    if (newClientData?.Billing) {
      clientDataToUpdate.LegalName = newClientData.Billing.LegalName;
      clientDataToUpdate.ContactName = newClientData.Billing.ContactName;
      clientDataToUpdate.VAT_ID = newClientData.Billing.VatID;
    }

    console.log("clientDataToUpdate", clientDataToUpdate);

    setClientData((prev) => {
      console.log(prev);
      return {
        ...prev,
        ...clientDataToUpdate,
      };
    });

    updateLastCheckedAndData({
      uInfo: {
        ...user.uInfo,
        ...clientDataToUpdate,
      },
    });
    dispatch({
      type: "CLEAR_CHECKOUT_STEPS",
    });
    return { status: 200, message: "Success" };
  }

  function getClientToken() {
    return Cookies.get("uat");
  }
  async function verifyClientToken(message) {
    console.log(
      "before if assertion: ",

      message
    );
    const time = sessionStorage.getItem("lastChecked");
    let lastChecked = time ? time : Date.now() + 31000;
    lastChecked = parseInt(lastChecked);

    if (isClientVerified && lastChecked + 30000 > Date.now()) {
      return 200;
    }
    console.log(
      "verifying client token",
      new Date(Date.now()).toLocaleString()
    );
    const res = await fetch("/api/rest/WebSite/check-login-token", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: Cookies.get("uat"),
      }),
    });
    if (res.status === 200) {
      if (!isClientVerified) {
        setIsClientVerified(true);
        updateLastCheckedAndData({ isVerified: true });
      }
    } else {
      setIsClientVerified(false);
      logoutClient();
    }
    if (res.status === 200) {
      if (getClientInfo() === null) {
        getFullClientInfo();
      }
    }
    updateLastChecked();

    return res.status;
  }

  function getClientVerified() {
    return isClientVerified;
  }

  async function loginClient(username, password) {
    setIsLoggingIn(true);

    const res = await login(username, password);
    if (res.status === 500) {
      setIsLoggingIn(false);
      return { status: 500, message: "Internal Server Error" };
    }
    const data = await res.json();
    if (data.IsUserActive) {
      Cookies.set("uat", data.LoginToken);
      setClientToken(data.LoginToken);
      setIsClientVerified(true);

      updateLastCheckedAndData({ isVerified: true });
      dispatch({ type: "SET_CART_LOADING", payload: true });
      const uname = await getFullClientInfo();
      dispatch({
        type: "LOAD_CART",
        payload: uname.SiteUser,
      });
    }
    setIsLoggingIn(false);
    return data;
  }

  async function logoutClient() {
    if (isLoggingIn) return;
    Cookies.remove("uat");

    setClientToken("");
    setIsClientVerified(false);
    setUser((prev) => ({}));
    sessionStorage.clear();
    const res = await fetch("/api/rest/WebSite/logout", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: clientToken,
      }),
    });
    const data = await res.json();

    return data.status === res.status;
  }

  async function getDuePayments() {
    const res = await fetch("/api/rest/WebSite/due-payments", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: getClientToken(),
      }),
    });

    if (res.status === 400) {
      logoutClient();
      return null;
    }

    const data = await res.json();
    updateLastChecked();

    return data;
  }

  async function changePassword(oldPassword, newPassword) {
    const res = await fetch("/api/rest/WebSite/change-password", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: getClientToken(),
        PreviousPassword: oldPassword,
        NewPassword: newPassword,
      }),
    });
    let data = {};

    if (res.status === 400) {
      data = await res.json();
      if (data.error === "Invalid password") {
        return { status: 400, message: "Invalid password" };
      }
      if (data.error === "Invalid token") {
        logoutClient();
        return null;
      }
      return { status: 400, message: "Something went wrong" };
    }

    updateLastChecked();

    return { status: 200, message: "Success" };
  }

  async function verifyPassword(username, password) {
    const res = await login(username, password);
    if (res.status === 500) {
      setIsLoggingIn(false);
      return { status: 500, message: "Internal Server Error" };
    }
    let data;

    if (res.status === 401 || res.status === 400) {
      data = await res.json();
      if (data.error) {
        return { status: res.status, message: data.error };
      }
    }

    updateLastChecked();

    data = await res.json();

    return { status: 200, message: "Success", loginToken: data.LoginToken };
  }

  async function changeEmail(newEmail, loginToken) {
    console.log("changing email", newEmail, loginToken);
    const res = await fetch("/api/rest/WebSite/send-change-email-email", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: loginToken,
        NewEmail: newEmail,
        ConfirmationLink:
          "http://" +
          process.env.NEXT_PUBLIC_WEBSITE_HOST +
          "/user/verify-email-change?customer=$confirmation_key$",
      }),
    });
    let data = {};

    if (res.status === 400) {
      data = await res.json();
      if (data.error) {
        return { status: 400, message: data.error };
      }
      if (data.error === "Invalid token") {
        logoutClient();
        return null;
      }
      return { status: 400, message: "Something went wrong" };
    }

    return { status: 200, message: "Success", newEmail: newEmail };
  }

  async function resendChangeEmailVerification(newEmail) {
    const res = fetch("/api/rest/WebSite/resend-change-email-verification", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: getClientToken(),
        NewEmail: newEmail,
        ChangeEmailLink:
          "http://" +
          process.env.NEXT_PUBLIC_WEBSITE_HOST +
          "/user/reset-password?token=$reset_token$",
      }),
    });
    let data = {};
    if (res.status === 400) {
      data = await res.json();
      if (data.error) {
        return { status: 400, message: data.error };
      }
      if (data.error === "Invalid token") {
        logoutClient();
        return null;
      }
      return { status: 400, message: "Something went wrong" };
    }

    return { status: 200, message: "Success", newEmail: newEmail };
  }

  async function login(username, password) {
    const res = await fetch("/api/rest/WebSite/login", {
      method: "POST",
      body: JSON.stringify({
        UserOrEmail: username,
        Password: password,
      }),
    });
    return res;
  }

  function updateLastCheckedAndData(newData) {
    setUser((prevUser) => ({
      ...prevUser,
      ...newData,
    }));
    updateLastChecked();
  }
  function updateLastChecked() {
    sessionStorage.setItem("lastChecked", Date.now());
  }

  useEffect(() => {
    if (user?.isVerified && Cookies.get("uat") && isClientVerified === false) {
      setIsClientVerified(true);
    }
    if (Cookies.get("uat")) {
      verifyClientToken("on mount");
    }
  }, []);

  return (
    <ClientContext.Provider
      value={{
        getClientToken,
        verifyClientToken,
        getFullClientInfo,
        updateClientInfo,
        loginClient,
        getClientInfo,
        setClientInfo,
        logoutClient,
        getClientVerified,
        isClientVerified,
        getDuePayments,
        changePassword,
        isFetchingUser,
        changeEmail,
        verifyPassword,
        resendChangeEmailVerification,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
