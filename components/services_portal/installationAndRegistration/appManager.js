import styles from "./ins_app.module.css";
import { Fragment } from "react";
import Image from "next/image";
import MyImage from "../../utils/myImage";
export default function AppManager() {
  return (
    <Fragment>
      <div className={styles.description}>
        <h3>
          The EZTitles Applications Manager is here to help you manage all your
          EZTitles software in one place and keep it up to date with each new
          version we release.
        </h3>
      </div>
      <div className={styles.downloader_wrapper}>
        <div className={styles.downloader}>
          <div className={styles.downloader_title}>
            <Image
              src="/images/icons/ez-icons-appm.png"
              width={55}
              height={55}
              alt="Application Manager"
            />
            <p className={styles.download_title_text}>
              EZTitles Application Manager
              <br /> <small>6.0.8</small>
            </p>
          </div>
          <div className={styles.downloader_button}>
            <button className="button button_small">Download</button>
            <small>EXE, 3.61 MB</small>
          </div>
        </div>
        <div className={styles.downloader_info}>
          <p>
            Please download and install the new EZTitles Applications Manager
            software. It will assist you with installing and getting your
            software up and running, applying your licenses and keeping your
            versions up to date.
          </p>
        </div>
      </div>
    </Fragment>
  );
}
