import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import CustomInput from "../inputs/customInput";
import LoaderDots from "../utils/loaderDots";
import { promiseResolver } from "../../lib/promiseResolver";
export default function AddToWalletBalanceModal({
  setIsAddToBalanceOpen,
  walletHash,
  walletName,
  tokens,
  globalAvailableTokens,
}) {
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const [data, error] = await promiseResolver(
      fetch("/api/rest/SubtitlingAssistant/sa-wallet-transactions", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: Cookies.get("uat"),
          "wallet-key": walletHash,
          tokens: amountToAdd,
          source: "website",
        }),
      })
    );
    if (error) {
      toast.error(error.toString(), {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
    if (data.status === 400) {
      const err = await data.json();
      if (err.error === "Invalid token") {
        toast.error(err.error, {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        dispatch({ type: "LOGOUT" });
      }
    } else if (data.status === 200) {
      setIsAddToBalanceOpen(false);
      toast.success("Successfully added to wallet", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    } else if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    } else {
      toast.error("Something went wrong", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      const dataError = await data.json();
      setError(dataError.error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        .add-tokens-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .add-tokens-wrapper_title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--clr-neutral-800);
        }
        .add-tokens-inner {
          display: flex;
          flex-direction: column;
        }
        .add-tokens-inner-available_wrapper {
          display: flex;
        }
        .add-tokens-inner-available_text {
          color: var(--clr-neutral-800);
        }
        .add-tokens-inner-available_amount {
          color: var(--clr-primary-500);
          font-weight: bold;
        }
        .add-tokens-inner-details_wrapper {
          display: flex;
          flex-direction: column;
        }
        .wallet-details-cell {
          display: flex;

          gap: 1em;
        }
        .error-message {
          color: var(--clr-warn);
          font-size: 1rem;
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
          background-color: var(--clr-warn-opacity-25);
          border-radius: 9px;
          border: 1px solid var(--clr-warn);
          padding: 0.5rem;
        }
      `}</style>
      <div className="add-tokens-wrapper">
        <p className="add-tokens-wrapper_title">add tokens</p>
        {error && <p className="error-message">{error}</p>}
        <div className="add-tokens-inner">
          <div className="add-tokens-inner-available_wrapper">
            <span className="add-tokens-inner-available_text">
              Available Tokens:
            </span>
            <span className="add-tokens-inner-available_amount">
              {globalAvailableTokens}
            </span>
          </div>
          <div className="add-tokens-inner-details_wrapper">
            <div className="wallet-details-cell">
              {" "}
              <span>Wallet Name:</span>
              <span className="wallet-name">{walletName}</span>
            </div>
            <div className="wallet-details-cell">
              {" "}
              <span>Wallet Hash:</span>{" "}
              <span className="wallet-hash">{walletHash}</span>
            </div>
            <div className="wallet-details-cell">
              {" "}
              <span>Wallet balance:</span>
              <span className="wallet-tokens">{tokens}</span>
            </div>
          </div>
          <div className="">
            <CustomInput
              type="text"
              placeholder="Amount of Tokens to transfer"
              value={amountToAdd}
              handleChange={(e) => setAmountToAdd(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="">
            {!isLoading ? (
              <button
                className="button button_basic_long_on_light_bg"
                onClick={handleTransfer}
              >
                transfer
              </button>
            ) : (
              <LoaderDots size="s" color="system" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
