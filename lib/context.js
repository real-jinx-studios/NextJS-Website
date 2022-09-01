import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import throttle from "./throttle";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { use } from "chai";
const ClientContext = createContext({});

export function useClient() {
  return useContext(ClientContext);
}

export function ClientProvider({ children }) {
  const [user, setUser] = useSessionStorage("user", {});
  const [clientToken, setClientToken] = useState(Cookies.get("uat") || "");
  const [clientData, setClientData] = useState(null);
  const [isClientVerified, setIsClientVerified] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  async function getFullClientInfo() {
    const res = await fetch("/api/rest/WebSite/get-customer-info", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: clientToken,
        GetSAInfo: true,
        GetLicInfo: true,
      }),
    });
    const data = await res.json();

    setClientData(data);
    setUser((prevUser) => ({ ...prevUser, uInfo: data }));
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

    setClientData((prev) => {
      return {
        ...prev,
        ...newClientData,
        LegalName: newClientData.Billing.LegalName,
        ContactName: newClientData.Billing.ContactName,
        VAT_ID: newClientData.Billing.VatID,
      };
    });
    setUser((prevUser) => ({
      ...prevUser,
      uInfo: {
        ...prevUser.uInfo,
        ...newClientData,
        LegalName: newClientData.Billing.LegalName,
        ContactName: newClientData.Billing.ContactName,
        VAT_ID: newClientData.Billing.VatID,
      },
    }));
    return res.status;
  }

  function getClientToken() {
    return clientToken;
  }
  async function verifyClientToken() {
    console.log("verifyClientToken");
    if (user?.isVerified && user?.time + 30000 > Date.now()) {
      return 200;
    }
    const res = await fetch("/api/rest/WebSite/check-login-token", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: clientToken,
      }),
    });
    if (res.status === 200) {
      setIsClientVerified(true);
    } else {
      setIsClientVerified(false);
      setUser((prevUser) => ({
        ...prevUser,
        isVerified: false,
        time: Date.now(),
      }));
    }
    if (res.status === 200) {
      setUser((prevUser) => ({
        ...prevUser,
        isVerified: true,
        time: Date.now(),
      }));
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

      setUser((prev) => {
        return {
          ...prev,
          ...data,
          isVerified: true,
          time: Date.now(),
        };
      });
    }
    setIsLoggingIn(false);
    return data;
  }
  async function logoutClient() {
    if (isLoggingIn) return;
    Cookies.remove("uat");
    const tempToken = clientToken;
    setClientToken("");
    setIsClientVerified(false);
    const res = await fetch("/api/rest/WebSite/logout", {
      method: "POST",
      body: JSON.stringify({
        LoginToken: clientToken,
      }),
    });
    const data = await res.json();
    setUser((prev) => ({}));
    return data.status === res.status;
  }

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
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
