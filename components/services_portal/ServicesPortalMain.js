import styles from "./services_portal.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

import BillingInformation from "./BillingInformation";
import CustomPayment from "./customPayment/customPayment";
import WalletManagement from "./walletManagement/walletManagement";
import InstallationRegistration from "./installationAndRegistration/installationRegistration";
import EditAccount from "./EditAccount";
import DuePayments from "./DuePayments";
import { useClient } from "../../lib/context";
import ParrotLoader from "../utils/ParrotLoader";
import { promiseResolver } from "../../lib/promiseResolver";
import LoadingCheck from "../utils/LoadingCheck";
import GenericModal from "../modal/GenericModal";
import AskPermissionModal from "../modal/AskPermissionModal";

export default function ServicesPortalMain(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [duePayments, setDuePayments] = useState({
    Payments: [],
  });
  const [duePaymentsLoading, setDuePaymentsLoading] = useState(false);
  const [isAskPermissionOpen, setIsAskPermissionOpen] = useState(false);

  const { getFullClientInfo, logoutClient, getClientToken } = useClient();

  useEffect(() => {
    setIsLoading(true);
    getFullClientInfo()
      .then((res) => {
        setIsLoading(false);
      })

      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    const fetchData = async () => {
      const paymentData = await handleFetchDuePayments();
    };
    fetchData();
  }, []);

  const handleFetchDuePayments = async () => {
    setIsLoading(true);
    setDuePaymentsLoading(true);
    const res = await promiseResolver(
      fetch("/api/rest/WebSite/due-payments", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: getClientToken(),
        }),
      })
    );

    const data = await res[0].json();
    setDuePayments(data);
    setIsLoading(false);
    setDuePaymentsLoading(false);
    return data;
  };

  const router = useRouter();

  const [selectedItem, setSelectedItem] = useState(
    router.query.account || "billing"
  );

  useEffect(() => {
    setSelectedItem("billing");
  }, []);

  //make use effect that runs only once

  const handleNavClick = (menuItem) => {
    setSelectedItem(menuItem);
  };

  const handleLogout = async () => {
    const res = await logoutClient();

    router.reload();
  };

  return (
    <section className="section offset-top">
      <style jsx>{`
        .due-payment {
        }
        .due-payment::before {
          content: attr(data-notification-number);
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 25%;
          left: 55%;
          transform: translate(-50%, -50%);
          width: 15px;
          height: 15px;
          font-size: 0.9rem;
          font-weight: 500;
          padding: 0.5rem;
          background-color: var(--clr-warn);
          border-radius: 50%;
        }
      `}</style>
      <div className="container">
        <div className={styles.services_wrapper}>
          <div className={styles.services_nav_wrapper}>
            <ul>
              <li
                onClick={() => {
                  handleNavClick("billing");
                }}
                className={
                  selectedItem === "billing"
                    ? styles.nav_item_active
                    : styles.nav_item
                }
              >
                <span className={`${styles.nav_item_inner}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.nav_item_icon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                  Billing Information
                </span>
              </li>
              <LoadingCheck isLoading={duePaymentsLoading}>
                <li
                  onClick={async () => {
                    await handleFetchDuePayments();
                    handleNavClick("duePayment");
                  }}
                  data-notification-number={duePayments?.Payments?.length || 0}
                  className={`${
                    selectedItem === "duePayment"
                      ? styles.nav_item_active
                      : styles.nav_item
                  }  ${duePayments?.Payments?.length && "due-payment"}`}
                >
                  <span className={`${styles.nav_item_inner}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={styles.nav_item_icon}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                      />
                    </svg>
                    Due Payments
                  </span>
                </li>
              </LoadingCheck>

              <li
                onClick={() => {
                  handleNavClick("wallet");
                }}
                className={
                  selectedItem === "wallet"
                    ? styles.nav_item_active
                    : styles.nav_item
                }
              >
                <span className={styles.nav_item_inner}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.nav_item_icon}
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
                  Wallet Management
                </span>
              </li>
              <li
                onClick={() => {
                  handleNavClick("install");
                }}
                className={
                  selectedItem === "install"
                    ? styles.nav_item_active
                    : styles.nav_item
                }
              >
                <span className={styles.nav_item_inner}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.nav_item_icon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    />
                  </svg>
                  Installation and Registration
                </span>
              </li>
              <li
                onClick={() => {
                  handleNavClick("edit");
                }}
                className={
                  selectedItem === "edit"
                    ? styles.nav_item_active
                    : styles.nav_item
                }
              >
                <span className={styles.nav_item_inner}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.nav_item_icon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit Account
                </span>
              </li>
              <li
                className={styles.nav_item}
                onClick={() => {
                  setIsAskPermissionOpen(true);
                }}
              >
                <span className={styles.nav_item_inner}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.nav_item_icon}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Logout
                </span>
              </li>
            </ul>
          </div>

          {!isLoading && (
            <div className={styles.content_wrapper}>
              {selectedItem === "billing" && (
                <BillingInformation isLoading={isLoading} />
              )}
              {selectedItem === "duePayment" && (
                <DuePayments
                  duePayments={duePayments}
                  setDuePayments={setDuePayments}
                  handleFetchDuePayments={handleFetchDuePayments}
                />
              )}
              {selectedItem === "payment" && (
                <CustomPayment isLoading={isLoading} />
              )}
              {selectedItem === "wallet" && (
                <WalletManagement isLoading={isLoading} />
              )}
              {selectedItem === "install" && (
                <InstallationRegistration isLoading={isLoading} />
              )}
              {selectedItem === "edit" && <EditAccount isLoading={isLoading} />}
            </div>
          )}
          {isLoading && (
            <div className={styles.content_wrapper}>
              <ParrotLoader />
            </div>
          )}
        </div>
      </div>
      <GenericModal
        open={isAskPermissionOpen}
        onClose={() => setIsAskPermissionOpen(false)}
      >
        <AskPermissionModal
          setIsAskPermissionOpen={setIsAskPermissionOpen}
          title="Logout"
          onConfirm={() => {
            handleLogout();
          }}
          onCancel={() => {
            setIsAskPermissionOpen(false);
          }}
        >
          <p className="paragraph dark">Are you sure you want to logout?</p>
        </AskPermissionModal>
      </GenericModal>
    </section>
  );
}
