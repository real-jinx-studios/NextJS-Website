import styles from "../services_portal.module.css";
import { useState } from "react";
import AppManager from "./appManager";
import Versions from "./versions";
import { Head } from "next/document";
import Registrations from "./registrations";
export default function InstallationRegistration() {
  const [tab, setTab] = useState("versions");
  return (
    <div className={styles.content}>
      <div className={styles.title_wrapper}>
        <h2>Installation & Registration</h2>
      </div>
      <div className={styles.content_inner_reg_ins}>
        <div className={styles.content_inner_reg_ins_nav}>
          <ul>
            <li
              className={tab === "app" ? styles.active_tab : styles.tab}
              onClick={() => setTab("app")}
            >
              EZTitles Application Manager
            </li>
            <li
              className={tab === "versions" ? styles.active_tab : styles.tab}
              onClick={() => setTab("versions")}
            >
              Latest Versions
            </li>
            <li
              className={
                tab === "registrations" ? styles.active_tab : styles.tab
              }
              onClick={() => setTab("registrations")}
            >
              Registration Files
            </li>
          </ul>
        </div>

        <div className={styles.content_inner_reg_ins_inner_content}>
          {tab === "app" && <AppManager />}
          {tab === "versions" && <Versions />}
          {tab === "registrations" && <Registrations />}
        </div>
      </div>
    </div>
  );
}
