import styles from "./ins_app.module.css";
import { Fragment } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Versions() {
  const handleDownloadFile = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/dev/file-download-test", {
      method: "POST",
      body: JSON.stringify({ name: "EZTitles-6.1.17.exe" }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status === 400) {
      const err = await res.json();
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
      return;
    }

    const file = await res.blob();
    saveAs(file, "EZTitles-6.1.17.exe");
  };
  const sampleFiles = [
    {
      title: "EZTitles-6.1.13",
      size: "62.78 MB",
      icon: "blue",
    },
    {
      title: "EZConvert-6.1.6",
      size: "21.12 MB",
      icon: "red",
    },
    {
      title: "3DTitles-5.1.2",
      size: "11.25 MB",
      icon: "green",
    },
    {
      title: "EZT-Avid-Plugin-5.3.15",
      size: "7.87 MB",
      icon: "gray",
    },
    {
      title: "EZT-Premiere-Plugin-5.3.15",
      size: "7.68 MB",
      icon: "gray",
    },
    {
      title: "EZT-Cambria-Plugin-5.3.15",
      size: "7.83 MB",
      icon: "blue",
    },
  ];
  return (
    <Fragment>
      <h3 className="gray align-center">Available Recent Versions</h3>
      <div className={styles.recent_versions}>
        {sampleFiles.map((x) => (
          <div
            onClick={handleDownloadFile}
            className={`${styles.file_wrapper} ${styles[x.icon]}`}
            key={x.title}
            data-before-content={x.icon}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`${x.icon} file`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            <p>
              {x.title}
              <br />
              <small>{x.size}</small>
            </p>
          </div>
        ))}
      </div>
      <div className={styles.old_versions_wrapper}>
        <div>
          <p className={styles.disclaimer}>
            <b>Please note:</b>
            <br />
            We've stopped supporting older versions of our software.
          </p>
        </div>
        <button className="button_small">Show older versions</button>
      </div>
      <div className={styles.version_footer}>
        <p>
          EZTitles 5.3.1 and later uses code of <a>FFmpeg</a> licensed under
          the&nbsp;<a>LGPLv2.1</a> and its source can be downloaded <a>here</a>.
        </p>
      </div>
    </Fragment>
  );
}
