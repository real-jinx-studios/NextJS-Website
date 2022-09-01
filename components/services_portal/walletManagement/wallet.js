import styles from "./wallet_management.module.css";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { promiseResolver } from "../../../lib/promiseResolver";
import GenericModal from "../../modal/GenericModal";
import CustomInput from "../../inputs/customInput";
import LoaderDots from "../../utils/loaderDots";
import AddToWalletBalanceModal from "../../modal/AddToWalletBalanceModal";
import SubstractFromWalletBalanceModal from "../../modal/SubstractFromWalletBalanceModal";
import { useClient } from "../../../lib/context";

export default function Wallet({
  key,
  name,
  description,
  hash,
  tokens,
  handleCopyID,
}) {
  const { getClientToken, logoutClient } = useClient();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddToBalanceOpen, setIsAddToBalanceOpen] = useState(false);
  const [isSubstractFromBalanceOpen, setIsSubstractFromBalanceOpen] =
    useState(false);
  const handleDelete = (e) => {
    setIsDeleteOpen(true);
  };
  const handleRealDelete = async (e) => {
    setIsLoading(true);
    const [data, error] = await promiseResolver(
      fetch("/api/rest/SubtitlingAssistant/sa-wallet-delete", {
        method: "POST",
        headers: {
          "Expected-Server-Version": "1.0.1",
        },
        body: JSON.stringify({
          LoginToken: getClientToken(),
          "wallet-key": props.hash,
        }),
      }),
      { endpoint: "sa-wallet-delete" }
    );
    if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }
    if (data.status === 400) {
      const err = await data.json();
      if (err.error === "Invalid token") {
        toast.error(err.error, {
          position: "bottom-right",
          autoClose: false,

          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setIsLoading(false);
        logoutClient();
      }
      return;
    }

    if (error) {
      setIsLoading(false);
      toast.error(error.toString(), {
        position: "bottom-right",
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
        setIsLoading(false);
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
        setIsLoading(false);
        toast.success("Wallet DELETED successfully", {
          position: "bottom-right",
          autoClose: false,

          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setIsDeleteOpen(false);
      }
    }
  };
  return (
    <div className={styles.wallet_management_wallets} key={key}>
      <div
        className={`${styles.wallet_management_delete_prompt_wrapper} ${
          isDeleteOpen ? styles.delete_prompt_open : ""
        }`}
      >
        <div className={styles.delete_prompt_title}>Delete wallet:</div>
        {!isLoading ? (
          <>
            <div className={styles.delete_prompt_wrapper}>
              <div className={styles.delete_prompt} onClick={handleRealDelete}>
                Yes
              </div>
              <div
                className={styles.delete_prompt}
                onClick={() => setIsDeleteOpen(false)}
              >
                No
              </div>
            </div>
            <div className={styles.delete_prompt_title_wrapper}>
              <p className={styles.delete_prompt_title_text}>{name}</p>
              <p className={styles.delete_prompt_title_description}>
                {description}
              </p>
            </div>
            <div className={styles.delete_prompt_hash_wrapper}>
              <span className={styles.delete_prompt_title_hash}>{hash}</span>
            </div>
            <div className={styles.delete_prompt_available_token_wrapper}>
              <p>Tokens:</p>
              <p>{tokens}</p>
            </div>
          </>
        ) : (
          <LoaderDots size="m" color="system" />
        )}
      </div>
      <div className={styles.wallet_description}>
        <div className={styles.wallet_name_wrapper}>
          <span
            className={`${styles.wallet_delete_button}  animated_shadow`}
            onClick={handleDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>

          <span className={`${styles.wallet_edit_button}  animated_shadow`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </span>
        </div>
        <div className={styles.wallet_name_wrapper}>
          <p className={styles.wallet_description_title}>{name}</p>
          <p className={styles.wallet_description_text}>{description}</p>
        </div>
      </div>
      <div className={styles.wallet_hash}>
        <div className={styles.wallet_hash_wrapper}>
          <p>{hash}</p>
          <a onClick={() => handleCopyID(hash)} className={styles.copy}>
            Copy ID
          </a>
        </div>
      </div>
      <div className={styles.wallet_tokens}>
        <span className={styles.wallet_tokens_wrapper}>{tokens}</span>

        <div className={styles.token_operations_wrapper}>
          <span
            className={`${styles.operations_button} animated_shadow`}
            onClick={() => setIsAddToBalanceOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </span>
          <span
            className={`${styles.operations_button}  animated_shadow`}
            onClick={() => setIsSubstractFromBalanceOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 12H6"
              />
            </svg>
          </span>
        </div>
      </div>

      <GenericModal
        open={isAddToBalanceOpen}
        onClose={() => setIsAddToBalanceOpen(false)}
      >
        <AddToWalletBalanceModal
          setIsAddToBalanceOpen={setIsAddToBalanceOpen}
          walletHash={hash}
          walletName={name}
          tokens={tokens}
        />
      </GenericModal>
      <GenericModal
        open={isSubstractFromBalanceOpen}
        onClose={() => setIsSubstractFromBalanceOpen(false)}
      >
        <SubstractFromWalletBalanceModal
          setIsSubstractFromBalanceOpen={setIsSubstractFromBalanceOpen}
          walletHash={hash}
          walletName={name}
          tokens={tokens}
        />
      </GenericModal>
    </div>
  );
}
