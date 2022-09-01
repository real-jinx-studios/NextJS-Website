import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import CustomInput from "../inputs/customInput";
import ParrotLoader from "../utils/ParrotLoader";
import { promiseResolver } from "../../lib/promiseResolver";
export default function CreateWalletModal({
  setIsCreateWalletOpen,
  forceUpdate,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [walletName, setWalletName] = useState("");
  const [walletDescription, setWalletDescription] = useState("");
  const handleWalletNameChange = (e) => {
    setWalletName(e.target.value);
  };
  const handleWalletDescriptionChange = (e) => {
    setWalletDescription(e.target.value);
  };
  const handleCreateWallet = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const [data, error] = await promiseResolver(
      fetch("/api/rest/SubtitlingAssistant/sa-wallet-add", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: Cookies.get("uat"),
          "wallet-name": walletName,
          "wallet-desc": walletDescription,
        }),
      }),
      { endpoint: "sa-wallet-add" }
    );
    if (error) {
      setIsLoading(false);
      toast.error("error", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else {
      const [data1, error] = await promiseResolver(data.json());
      if (error) {
        setIsLoading(false);
        toast.error(error, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      if (data.status === 500) {
        router.replace({
          pathname: "/500",
          query: { err: "internal server error" },
        });
      } else {
        setIsLoading(false);

        toast.success(
          "Wallet created successfully (" + data1["wallet-hash"] + ")",
          {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
        setIsCreateWalletOpen(false);
        forceUpdate();
      }
    }
  };
  return (
    <div className="create_wallet_wrapper flex-center-center-column">
      <style jsx>{`
        .create_wallet_wrapper {
        }

        .create_wallet-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--clr-neutral-800);
        }
      `}</style>
      <h2 className="create_wallet-title">Create a new wallet:</h2>
      <div className="create_wallet-form">
        {!isLoading ? (
          <form onSubmit={handleCreateWallet}>
            <CustomInput
              type="text"
              placeholder="Wallet name"
              required
              value={walletName}
              handleChange={handleWalletNameChange}
            />
            <CustomInput
              type="text"
              placeholder="Wallet description"
              value={walletDescription}
              handleChange={handleWalletDescriptionChange}
            />
            <button
              type="submit"
              className="button button_basic_long_on_light_bg"
            >
              Create
            </button>
          </form>
        ) : (
          <ParrotLoader size="m" color="system" />
        )}
      </div>
    </div>
  );
}
