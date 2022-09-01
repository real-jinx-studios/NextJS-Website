import styles from "./wallet_management.module.css";
import ReactTooltip from "react-tooltip";
import { useEffect, useState, useReducer } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Wallet from "./wallet";
import ActivityReports from "./activityReports";
import { promiseResolver } from "../../../lib/promiseResolver";
import GenericModal from "../../modal/GenericModal";
import CreateWalletModal from "../../modal/CreateWalletModal";
import BuyTokensModal from "../../modal/BuyTokensModal";
import AddToWalletBalanceModal from "../../modal/SubstractFromWalletBalanceModal";
import { useClient } from "../../../lib/context";

export default function WalletManagement() {
  const router = useRouter();
  const [isActivityReports, setIsActivityReports] = useState(false);
  const [wallets, setWallets] = useState([]);
  const [isCreateWalletOpen, setIsCreateWalletOpen] = useState(false);
  const [isBuyTokensOpen, setIsBuyTokensOpen] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [globalAvailableTokens, setGlobalAvailableTokens] = useState(0);
  const { getClientToken, logoutClient } = useClient();
  const handleCopyID = (e) => {
    navigator.clipboard.writeText(e);
    toast.info("Wallet ID copied to clipboard.", {
      position: "bottom-right",
      autoClose: false,

      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    const fetchWallets = async () => {
      const [data, error] = await promiseResolver(
        fetch("/api/rest/SubtitlingAssistant/sa-wallets-get", {
          method: "POST",
          headers: {
            "Expected-Server-Version": "1.0.1",
          },
          body: JSON.stringify({
            LoginToken: getClientToken(),
          }),
        }),
        { endpoint: "sa-wallets-get" }
      );
      if (data.status === 500) {
        router.replace({
          pathname: "/500",
          query: { err: "internal server error" },
        });
      }

      if (data.status === 400) {
        const resErr = await data.json();
        if (
          resErr?.error === "Invalid token" ||
          resErr?.error === "Invalid access token."
        ) {
          logoutClient();
          router.replace("/user/login");
          return;
        }
      }

      if (!data.status === 200) {
        const err = await data.json();
        toast.error(err.error, {
          position: "top-center",
          autoClose: false,

          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      } else {
        const [data1, error] = await promiseResolver(data.json());
        if (error) {
          toast.error(error, {
            position: "bottom-right",
            autoClose: false,

            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
        } else {
          setWallets(data1.wallets);
        }
      }
    };
    fetchWallets();
  }, []);

  if (isActivityReports) {
    return (
      <ActivityReports
        setIsActivityReports={setIsActivityReports}
        wallets={wallets}
      />
    );
  }
  return (
    <div className={styles.content}>
      <div className={styles.title_wrapper}>
        <h2>Wallet Management</h2>
      </div>
      <div className={styles.content_inner_wallet_management}>
        <div
          data-tip
          data-for="remaining-tokens"
          className={styles.wallet_management_stats_tokens_left}
        >
          <ReactTooltip id="remaining-tokens" type="info">
            <span>
              The amount of tokens you have available for distribution
              <br />
              amongst your wallets.
            </span>
          </ReactTooltip>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg_icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="main-color text-s text-bold-m">
            Remaining Tokens
          </span>
          <span className="neutral-dark-color text-m">
            {globalAvailableTokens}
          </span>
        </div>

        <div
          data-tip
          data-for="num-wallets"
          className={styles.wallet_management_stats_num_wallets}
        >
          <ReactTooltip id="num-wallets" type="info">
            <span>
              Amount of wallets that
              <br />
              you have created.
            </span>
          </ReactTooltip>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg_icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
            />
          </svg>
          <span className="main-color text-s text-bold-m">Wallets</span>
          <span className="neutral-dark-color text-m">{wallets?.length}</span>
        </div>

        <div
          data-tip
          data-for="num-tokens"
          className={styles.wallet_management_stats_balance}
        >
          {" "}
          <ReactTooltip id="num-tokens" type="info">
            <span>
              The total number of tokens
              <br />
              that you have across all your wallets.
            </span>
          </ReactTooltip>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={styles.svg_icon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="main-color text-s text-bold-m">Token Balance</span>
          <span className="neutral-dark-color text-m">
            {wallets?.reduce((total, wallet) => {
              return total + wallet.tokens;
            }, 0)}
          </span>
        </div>
        <div className={styles.wallet_management_buttons_buy_tokens}>
          <button
            className="button button_basic_long_on_light_bg"
            onClick={() => setIsBuyTokensOpen(true)}
          >
            buy tokens
          </button>
        </div>
        <div className={styles.wallet_management_buttons_add_wallet}>
          <button
            className="button button_basic_long_on_light_bg"
            onClick={() => setIsCreateWalletOpen(true)}
          >
            add wallet
          </button>
        </div>
        <div className={styles.wallet_management_buttons_reports}>
          <button
            className="button button_basic_long_on_light_bg"
            onClick={() => setIsActivityReports(true)}
          >
            activity reports
          </button>
        </div>
        <div className={styles.wallet_management_title_label1}>
          <div>
            <span>Wallet Name</span>
          </div>
        </div>
        <div className={styles.wallet_management_title_label2}>
          <div>
            <span>Wallet ID</span>
          </div>
        </div>
        <div className={styles.wallet_management_title_label3} key={wallets}>
          <div>
            <span>Tokens</span>
          </div>
        </div>
        {wallets?.map((wallet) => {
          return (
            <Wallet
              key={wallet.hash}
              name={wallet.name}
              description={wallet.description}
              hash={wallet.hash}
              tokens={wallet.tokens}
              handleCopyID={handleCopyID}
              globalAvailableTokens={globalAvailableTokens}
            />
          );
        })}
      </div>
      <GenericModal
        open={isCreateWalletOpen}
        onClose={() => setIsCreateWalletOpen(false)}
      >
        <CreateWalletModal
          setIsCreateWalletOpen={setIsCreateWalletOpen}
          forceUpdate={forceUpdate}
        />
      </GenericModal>
      <GenericModal
        open={isBuyTokensOpen}
        onClose={() => setIsBuyTokensOpen(false)}
      >
        <BuyTokensModal
          setIsBuyTokensOpen={setIsBuyTokensOpen}
          forceUpdate={forceUpdate}
        />
      </GenericModal>
    </div>
  );
}
