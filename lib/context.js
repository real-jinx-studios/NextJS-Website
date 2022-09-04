import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSessionStorage } from "../hooks/useSessionStorage";
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

  async function getFullClientInfo() {
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
    return data;
  }

  function getClientInfo() {
    if (!clientData) {
      if (user?.uInfo) {
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
    if (res.status === 400) {
      logoutClient();
      return null;
    }

    setClientData((prev) => {
      return {
        ...prev,
        ...newClientData,
        LegalName: newClientData.Billing.LegalName,
        ContactName: newClientData.Billing.ContactName,
        VAT_ID: newClientData.Billing.VatID,
      };
    });

    updateLastCheckedAndData({
      uInfo: {
        ...prevUser.uInfo,
        ...newClientData,
        LegalName: newClientData.Billing.LegalName,
        ContactName: newClientData.Billing.ContactName,
        VAT_ID: newClientData.Billing.VatID,
      },
    });

    return res.status;
  }

  function getClientToken() {
    return Cookies.get("uat");
  }
  async function verifyClientToken(message) {
    console.log(
      "before if assertion: ",

      message
    );
    if (isClientVerified && user?.time + 30000 > Date.now()) {
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
      setIsClientVerified(true);
    } else {
      setIsClientVerified(false);
      logoutClient();
    }
    if (res.status === 200) {
      if (getClientInfo() === null) {
        getFullClientInfo();
      }
      updateLastCheckedAndData({ isVerified: true });
    }

    return res.status;
  }

  function getClientVerified() {
    return isClientVerified;
  }

  async function loginClient(username, password) {
    setIsLoggingIn(true);

    const res = await fetch("/api/rest/WebSite/login", {
      method: "POST",
      body: JSON.stringify({
        UserOrEmail: username,
        Password: password,
      }),
    });
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
      getFullClientInfo();
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
    updateLastCheckedAndData();

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

    updateLastCheckedAndData();

    return { status: 200, message: "Success" };
  }

  function updateLastCheckedAndData(newData) {
    setUser((prevUser) => ({
      ...prevUser,
      ...newData,
      time: Date.now(),
    }));
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
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
