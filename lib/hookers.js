import Cookies from "js-cookie";
import customLog from "../components/utils/customLog";

export async function useVerifyUserCredentials(username, password) {
  try {
    const res = await fetch(`/api/rest/WebSite/login`, {
      method: "POST",
      body: JSON.stringify({
        UserOrEmail: username,
        Password: password,
      }),
    });

    if (res.status === 200) {
      const token = await res.json();

      return {
        username: username,
        loginToken: token.LoginToken,
        isUserActive: token.IsUserActive,
      };
    } else {
      return res;
    }
  } catch (e) {
    console.error(e);
    return e;
  }
}

export function useLogout() {
  const { state, dispatch } = userState();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return { handleLogout };
}

export async function getVersion() {
  try {
    const res = await fetch(`api/rest//info`, {
      method: "GET",
    });

    if (res.status === 200) {
      const token = await res.json();
    } else {
      throw new Error("check fetch method");
    }
  } catch (e) {
    customLog([e]);
    throw new Error(e);
  }
}

export function useUserData() {
  const loginToken = Cookies.get("uat");

  if (loginToken) {
    return {
      loginToken: loginToken,
      status: "authenticated",
    };
  }

  return {
    loginToken: null,
    status: "unauthenticated",
  };
}

export function useCheckHardwareId(hardwareId, item, loginToken) {
  console.log(item);
  let formattedOptions = item.options;
  formattedOptions = Object.keys(formattedOptions).map((option) => {
    return { [option]: formattedOptions[option][0] };
  });
  formattedOptions = Object.assign({}, ...formattedOptions);
  return fetch(`/api/rest/WebSite/verify-workstation-id`, {
    method: "POST",
    body: JSON.stringify({
      ProductId: item.id,
      ProductName: item.name,
      PaymentPlanID: item.paymentPlan,
      ProductOptions: formattedOptions,
      WorkstationID: hardwareId,
      LoginToken: loginToken,
    }),
  });
}
