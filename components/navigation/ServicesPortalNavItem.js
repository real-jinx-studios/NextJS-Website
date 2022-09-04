import styles from "./navbar2.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useClient } from "../../lib/context";
import AuthCheck from "../forms/auth/AuthCheck";
import GenericModal from "../modal/GenericModal";
import AskPermissionModal from "../modal/AskPermissionModal";
import { use } from "chai";

export default function ServicesPortalNavItem() {
  const { getClientInfo, getClientVerified } = useClient();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  useEffect(() => {
    const clientInfo = getClientInfo();
    if (clientInfo) {
      setUserLoggedIn(true);
    }
  }, [getClientVerified]);

  return (
    <AuthCheck
      fallback={
        <Link href="/services-portal">
          <a className={styles.nav_link_a}>Login</a>
        </Link>
      }
    >
      <ServicesPortalButton />
    </AuthCheck>
  );
}

function ServicesPortalButton() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isOnDropdown, setIsOnDropdown] = useState(false);
  const { getClientInfo, logoutClient } = useClient();
  const [isAskPermissionOpen, setIsAskPermissionOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    const res = await logoutClient();

    setDropdownVisible(false);
    setIsOnDropdown(false);
    //router.reload();
  };

  return (
    <>
      <Link href="/services-portal">
        <a
          className={styles.nav_link_a + " " + styles.portal_link}
          onMouseEnter={() => {
            setDropdownVisible(true);
          }}
          onMouseLeave={() => setTimeout(() => setDropdownVisible(false), 500)}
        >
          Services Portal
        </a>
      </Link>
      {(dropdownVisible || isOnDropdown) && (
        <div
          className="dropdown-wrapper"
          onMouseEnter={() => setIsOnDropdown(true)}
          onMouseLeave={() => setTimeout(() => setIsOnDropdown(false), 300)}
        >
          <style jsx>{`
            .dropdown-wrapper {
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background-color: #fff;
              z-index: 100;
              box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
              padding: 9px;
              border-radius: 5px;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              transition: all 0.3s ease-in-out;
            }
            .dropdown-wrapper:hover {
              box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.2);
            }
            .username-wrapper {
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .username-wrapper > p {
              margin: 0;
              color: var(--clr-neutral-800);
            }
            .dropdown-inner {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              width: 100%;
              max-width: 300px;
              padding: 8px;
              border-radius: 5px;
              box-sizing: border-box;
              background-color: #fff;
              box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.1);
              transition: all 0.3s ease-in-out;
            }
            .dropdown-item {
              color: var(--clr-neutral-800);
              cursor: pointer;
            }
          `}</style>
          <div className="username-wrapper">
            <p className="username">{getClientInfo()?.SiteUser || ""}</p>
          </div>
          <div className="dropdown-inner">
            <a
              className="dropdown-item"
              onClick={() => {
                setIsAskPermissionOpen(true);
              }}
            >
              Logout
            </a>
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
        </div>
      )}
    </>
  );
}
