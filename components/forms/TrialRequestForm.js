import styles from "./trial_request_form.module.css";
import CustomInput from "../inputs/customInput";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";
import { useRef, useState, Fragment, useEffect } from "react";
import { promiseResolver } from "../../lib/promiseResolver";
import { useCheckHardwareId } from "../../lib/hookers";

export default function TrialRequestForm(props) {
  const [userDetails, setUserDetails] = useState({
    customerType: "",
    hasLicense: false,
  });
  const loginToken = props.clientToken;

  useEffect(() => {
    const fetcher = async () => {
      const [data, error] = await promiseResolver(
        fetch("/api/rest/WebSite/get-customer-info", {
          method: "POST",
          body: JSON.stringify({
            LoginToken: loginToken,
            GetSAInfo: true,
            GetLicInfo: true,
          }),
        }),
        { endpoint: "get-customer-info" }
      );
      if (error) {
        if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
          toast.error(error.message);
        }
      } else {
        if (data.status === 500) {
          router.replace({
            pathname: "/500",
            query: { err: "internal server error" },
          });
        }
        const [data1, error] = await promiseResolver(data.json());
        if (error) {
          if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
            toast.error(error.message);
          }
        } else {
          setUserDetails({
            customerType: data1.CustomerType,
            hasLicense: data1.Licenses?.length > 0,
          });
        }
      }
    };
    fetcher();
  }, []);

  const hardwareIDRef = useRef();

  const policyRef = useRef();
  const eztRef = useRef();
  const ezcRef = useRef();
  const pmcRef = useRef();
  const csRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [policyCheck, setPolicyCheck] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const isIdValid = await useCheckHardwareId(hardwareIDRef.current.value);
    if (isIdValid.status === 200) {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.success("wordstation id is valid", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      setIsLoading(false);
    } else {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.error("wordstation id is not valid", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      setIsLoading(false);
      return;
    }

    let trtialsArray = [];

    [eztRef, ezcRef, pmcRef, csRef].forEach((ref) => {
      if (ref.current.checked) {
        trtialsArray.push({
          WorkstationID: hardwareIDRef.current.value,
          ProductCode: ref.current.getAttribute("data-product-code"),
          ProductName: ref.current.getAttribute("data-product-name"),
        });
      }
    });

    const [data, error] = await promiseResolver(
      fetch("/api/rest/WebSite/trial-request", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: loginToken,
          Licenses: trtialsArray,
        }),
      })
    );

    if (data.status === 200) {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.success("trial request sent successfully", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      setIsLoading(false);
    } else if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    } else {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.error("trial request failed", {
          position: "top-center",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      setIsLoading(false);
    }
  };
  return (
    <form
      className={styles.form}
      onSubmit={onSubmit}
      data-before-title="REQUEST"
      data-after-title="TRIAL"
    >
      <div className={styles.form_section_wrapper}>
        <div className={styles.form_section_title_wrapper} step-number="1">
          <p>Download the Workstation ID tool and run it on your computer.</p>
          <button className="button button_basic_long">DOWNLOAD</button>
        </div>
        <div className={styles.input_wrapper}>
          <p className={styles.input_info}>
            Enter the Workstation ID obtained from the HardID tool.
          </p>
          <CustomInput
            reference={hardwareIDRef}
            type="text"
            name="hardwareID"
            id="trial_request_hardwareID"
            placeholder="Workstation ID"
            isRequired
          />
        </div>
      </div>

      {userDetails.customerType !== "student" ? (
        <div className={styles.form_section_wrapper}>
          <style jsx>
            {`
              .shit {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1.5em;
              }
              a {
                color: var(--clr-primary);
              }
            `}
          </style>
          <div className={styles.form_section_title_wrapper} step-number="2">
            <p>Select Product(s):</p>
          </div>
          <div className="shit">
            <div className={styles.product_outer}>
              <div className={styles.product_select_wrapper}>
                <div>
                  <input
                    className={styles.checkbox_input}
                    ref={eztRef}
                    type="checkbox"
                    id="ezt"
                    data-product-code="EZT_E"
                    data-product-name="EZTitles Essentials"
                    onChange={(e) => setPolicyCheck(e.target.checked)}
                  />
                  <label className={styles.product_wrapper} for="ezt">
                    <label className={styles.product} for="ezt">
                      <img
                        src="/images/icons/ez_icon3.png"
                        width={50}
                        height={50}
                        alt="EZtitles Icon"
                      />
                      <p>EZTitles Ultimate</p>
                    </label>
                  </label>
                </div>
                <div>
                  <input
                    className={styles.checkbox_input}
                    ref={ezcRef}
                    type="checkbox"
                    id="ezc"
                    data-product-code="EZC_P"
                    data-product-name="EZConvert Professional"
                    onChange={(e) => setPolicyCheck(e.target.checked)}
                  />
                  <label className={styles.product_wrapper} for="ezc">
                    <label className={styles.product} for="ezc">
                      <img
                        src="/images/icons/ezc_icon3.png"
                        width={50}
                        height={50}
                        alt="EZConvert Icon"
                      />
                      <p>EZConvert Professional (5 day trial)</p>
                    </label>
                  </label>
                </div>
                <div>
                  <input
                    className={styles.checkbox_input}
                    ref={pmcRef}
                    type="checkbox"
                    id="ezp1"
                    data-product-code="PMC"
                    data-product-name="EZTitles Plug-in for ProMedia Carbon"
                    onChange={(e) => setPolicyCheck(e.target.checked)}
                  />
                  <label className={styles.product_wrapper} for="ezp1">
                    <label className={styles.product} for="ezp1">
                      <img
                        src="/images/icons/ep_icon3.png"
                        width={50}
                        height={50}
                        alt="EZTitles Plugin Icon"
                      />
                      <p>EZTitles Plug-in for ProMedia@ Carbon</p>
                    </label>
                  </label>
                </div>
                <div>
                  <input
                    className={styles.checkbox_input}
                    ref={csRef}
                    type="checkbox"
                    id="ezp2"
                    data-product-code="CS"
                    data-product-name="EZTitles Plug-in for Cambria File Convert"
                    onChange={(e) => setPolicyCheck(e.target.checked)}
                  />
                  <label className={styles.product_wrapper} for="ezp2">
                    <label className={styles.product} for="ezp2">
                      <img
                        src="/images/icons/ep_icon3.png"
                        width={50}
                        height={50}
                        alt="EZTitles Plugin Icon"
                      />
                      <p>EZTitles Plug-in for Cambria FTC</p>
                    </label>
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              {!isLoading ? (
                <Fragment>
                  <button
                    className={
                      policyCheck ? "button" : "button button_disabled"
                    }
                    type="submit"
                  >
                    SEND TRIAL REQUEST
                  </button>
                </Fragment>
              ) : (
                <div className={styles.loader_wrapper}>
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.form_section_wrapper}>
          <style jsx>
            {`
              .shit {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 1.5em;
              }
              a {
                color: var(--clr-primary);
              }
            `}
          </style>
          <div className={styles.form_section_title_wrapper} step-number="2">
            <p>Student Trial:</p>
          </div>
          <div className="shit">
            <div className={styles.product_outer}>
              <div className={styles.product_select_wrapper}>
                <div>
                  <input
                    className={styles.checkbox_input}
                    ref={policyRef}
                    type="checkbox"
                    id="ezt"
                    checked={true}
                  />
                  <label className={styles.product_wrapper} htmlFor="ezt">
                    <label className={styles.product} htmlFor="ezt">
                      <img
                        src="/images/icons/ez_icon3.png"
                        width={50}
                        height={50}
                        alt="EZtitles Icon"
                      />
                      <p>EZTitles Ultimate: Student Trial (3 months)</p>
                    </label>
                  </label>
                </div>
              </div>
            </div>
            <div className="">
              {!isLoading ? (
                <Fragment>
                  <button className={"button"} type="submit">
                    SEND TRIAL REQUEST
                  </button>
                </Fragment>
              ) : (
                <div className={styles.loader_wrapper}>
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
