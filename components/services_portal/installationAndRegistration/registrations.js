import styles from "./ins_app.module.css";
import { Fragment } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import customLog from "../../utils/customLog";
import { useClient } from "../../../lib/context";
const zlib = require("zlib");
export default function Registrations() {
  const router = useRouter();
  const { getClientToken, logoutClient, getClientInfo } = useClient();

  const handleLicenseFileDownload = async (type) => {
    if (type === "license") {
      const file = await fetch(
        `/api/rest/AppsManager/get-workstaion-id-licences`,
        {
          method: "POST",
          body: JSON.stringify({
            LoginToken: getClientToken(),
          }),
        }
      );
      if (file.status === 500) {
        router.replace({
          pathname: "/500",
          query: { err: "internal server error" },
        });
      }
      if (file.status === 400) {
        const err = await file.json();
        if (err.error === "Invalid token") {
          if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
            toast.error(err.error, {
              position: "bottom-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }

          logoutClient();
          router.replace({
            pathname: "/user/login",
            query: { err: "invalid token" },
          });
          setIsLoading(false);
        }
        return;
      }
      const fileBlob = await file.blob();
      const byteArray = new Uint8Array(await fileBlob.arrayBuffer());
      zlib.inflate(byteArray, function (err, result) {
        if (err) {
          customLog([err, "err"]);
        } else {
          try {
            saveAs(
              new Blob([result.toString()], { type: "text/xml;charset=utf-8" }),
              "license.eztlic"
            );
          } catch (err) {
            customLog([err, "err"]);
          }
        }
      });
    } else {
      const file = await fetch(`/api/rest/AppsManager/get-dongle-licences`, {
        method: "POST",
        body: JSON.stringify({
          LoginToken: getClientToken(),
        }),
      });
      if (file.status === 500) {
        router.replace({
          pathname: "/500",
          query: { err: "internal server error" },
        });
      }
      if (file.status === 400) {
        const err = await file.json();
        if (err.error === "Invalid token") {
          if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
            toast.error(err.error, {
              position: "bottom-right",
              autoClose: 1500,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            });
          }
          logoutClient();
          router.replace({
            pathname: "/user/login",
            query: { err: "invalid token" },
          });
          setIsLoading(false);
        }
        return;
      }
      const fileBlob = await file.blob();
      const byteArray = new Uint8Array(await fileBlob.arrayBuffer());
      zlib.inflate(byteArray, function (err, result) {
        if (err) {
          customLog([err, "err"]);
        } else {
          try {
            saveAs(
              new Blob([result.toString()], { type: "text/xml;charset=utf-8" }),
              "license.eztlic"
            );
          } catch (err) {
            customLog([err, "err"]);
          }
        }
      });
    }
  };
  return (
    <Fragment>
      <h3 className="gray align-center title">Registration Files</h3>
      <style jsx>{`
        .title {
          margin-bottom: var(--offset-6);
        }
        .license_download_wrapper {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: var(--offset-3);
        }
        .no-licenses-found {
          color: var(--clr-neutral-800);
          font-size: 1.2rem;
        }
      `}</style>
      <div className="license_download_wrapper">
        {getClientInfo().Licenses.filter((e) => e?.Valid && !e?.IsDongle)
          .length > 0 && (
          <button
            className="button button_basic_long_on_light_bg"
            onClick={() => handleLicenseFileDownload("license")}
          >
            Download HardID License File
          </button>
        )}
        {getClientInfo().Licenses.filter((e) => e?.Valid && e?.IsDongle)
          .length > 0 && (
          <button
            className="button button_basic_long_on_light_bg"
            onClick={() => handleLicenseFileDownload("dongle")}
          >
            Download Dongle License File
          </button>
        )}
        {getClientInfo().Licenses.length === 0 && (
          <h3 className="no-licenses-found">
            You dont have any valid licenses.
          </h3>
        )}
      </div>
    </Fragment>
  );
}
