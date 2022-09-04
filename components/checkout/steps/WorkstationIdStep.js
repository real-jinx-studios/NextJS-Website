import styles from "./steps.module.css";
import CustomInput from "../../inputs/customInput";
import React, { useRef, useState, useEffect } from "react";
import { cartState } from "../../../lib/cartContext";
import { useCheckHardwareId } from "../../../lib/hookers";
import { useClient } from "../../../lib/context";
import LoaderDots from "../../utils/loaderDots";
export default function WorkstationIdStep({
  user = {},
  isCartEditable = false,
  setIsCartEditable,
  stepNumber,
  stepIncrement,
  stepDecrement,
  setStepValid,
}) {
  const { cState, dispatch } = cartState();
  const { getClientToken } = useClient();

  const [workstationIds, setWorkstationIds] = useState(cState.workstationIds);
  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [usedWorkstationIds, setUsedWorkstationIds] = useState(null);

  const isWorkstationIdValid = cState.checkout.workstation;

  useEffect(() => {
    setIsLoading(true);

    if (!usedWorkstationIds) {
      const fetchOldIds = async () => {
        const result = await fetch(`/api/rest/WebSite/workstationids`, {
          method: "POST",
          body: JSON.stringify({
            LoginToken: getClientToken(),
          }),
        });
        let data = await result.json();
        data = data.WorkstationIds;

        const comparator = (a, b) => {
          return a
            .toString()
            .localeCompare(b.toString(), "en", { numeric: true });
        };

        const sortedDataArray = data.sort(comparator);
        setUsedWorkstationIds(sortedDataArray);
        setIsLoading(false);
      };
      fetchOldIds();
    } else {
      setIsLoading(false);
    }
  }, []);

  const workstationIdFields = [];

  cState.items.forEach((item) => {
    if (item.hardwareIdCount > 0) {
      for (let i = 0; i < item.quantity; i++) {
        workstationIdFields.push(
          <WorkstationIdField
            item={item}
            id={`${item.productReferenceId}-${i}`}
            key={`${item.productReferenceId}-${i}`}
            name={i}
            productReferenceId={item.productReferenceId}
            workstationIds={workstationIds}
            setWorkstationIds={setWorkstationIds}
            setFormErrors={setFormErrors}
            formErrors={formErrors}
            usedWorkstationIds={usedWorkstationIds}
          />
        );
      }
    }
  });

  const handleCancel = () => {
    const isValid = handleSubmit();
    setStepValid(isValid);

    stepDecrement();
  };
  const handleSkip = () => {
    setStepValid(true);
    stepIncrement();
  };
  const handleSubmit = () => {
    setIsLoading(true);

    if (Object.keys(formErrors).length > 0) {
      setIsLoading(false);
      return false;
    }

    dispatch({
      type: "SET_WORKSTATION_IDS",
      payload: workstationIds,
    });

    return true;
  };
  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const verifyStep = (e) => {
    const isValid = handleSubmit(e);
    setStepValid(isValid);
    stepIncrement();
  };

  useEffect(() => {
    if (cState.setStepToBeActive === true) {
      const isValid = handleSubmit();
      setStepValid(isValid);
      dispatch({
        type: "SET_STEP",
      });
    }
  }, [cState.setStepToBeActive]);

  return (
    <div
      className={styles.billing}
      //onClick={isCartEditable ? () => setIsCartEditable(false) : ""}
    >
      <style jsx>{`
        .description {
          font-size: 1.2em;
          margin-bottom: 1em;
          color: var(--clr-neutral-800);
        }
        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1em;
        }
        .step-action-info {
          display: flex;
          flex-direction: column;
          gap: 0.6em;
        }
        .workstation-id-fields {
          margin-bottom: 1em;
        }
      `}</style>
      {
        <div
          className={`${styles.billing__inner} ${
            isCartEditable ? styles.cart_editable : ""
          }`}
          data-step={stepNumber}
        >
          <h3 className={styles.billing__title}>Workstation IDs</h3>
          <p className="description">
            In order to activate your software we need a Workstation ID for
            every rent license. You can get your Workstation ID and send it to
            us now or at a later point via email. To get your{" "}
            <a className="link_anim_2">Workstation ID download our tool</a>, run
            it on your computer and paste the reported numbers below
          </p>

          {!isLoading && (
            <>
              <div className="workstation-id-fields">
                {" "}
                {workstationIdFields}
              </div>
              <div className="step-action-info">
                <small>
                  *Only valid workstations id fields will be processed
                </small>
                {Object.keys(formErrors).length > 0 && (
                  <small style={{ color: "var(--clr-warn)" }}>
                    *Some of your WorkstationIds are not valid!
                  </small>
                )}
              </div>
              <div className={styles.step_actions}>
                <button
                  className="button button_basic_long_on_light_bg"
                  onClick={verifyStep}
                >
                  Next
                </button>
                <button
                  className="button button_basic_long_on_light_bg"
                  onClick={handleCancel}
                >
                  Previous
                </button>
              </div>
            </>
          )}
          {isLoading && (
            <div className="flex-center-center">
              <LoaderDots size="m" color="system" />
            </div>
          )}
        </div>
      }
    </div>
  );
}

function WorkstationIdField({
  item,

  workstationIds,
  setWorkstationIds,
  productReferenceId,
  name,
  id,
  formErrors = {},
  setFormErrors,
  usedWorkstationIds = [],
}) {
  const hardwareIDRef = useRef();
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(undefined);
  const [dirty, setDirty] = useState(() => {
    if (hardwareIDRef.current) {
      return hardwareIDRef.current.value !== "" ? true : false;
    }
    return false;
  });
  const [isFocused, setIsFocused] = useState(false);

  const identity = id + "-workstationid-" + name;
  let idsProductAlradyHas = [];
  Object.keys(workstationIds).forEach((key) => {
    if (workstationIds[key].productReferenceId === productReferenceId) {
      idsProductAlradyHas.push(workstationIds[key].hardwareID);
    }
  });

  const handleSetError = (error) => {
    setError(error);
    if (!error) {
      setFormErrors(() => {
        let newFormErrors = { ...formErrors };
        delete newFormErrors[identity];
        return newFormErrors;
      });
      return;
    }
    setFormErrors({ ...formErrors, [identity]: error });
  };
  const handleBlur = async () => {
    const hardwareID = hardwareIDRef.current.value;
    //check if hardwareID is empty remove spaces

    if (hardwareID.trim() === "") {
      handleSetError(false);

      setIsValid(undefined);
      setDirty(false);
      return;
    }

    //check if hardwareid has already been used for this product
    let isDuplicate = false;

    Object.keys(workstationIds).forEach((key) => {
      if (
        workstationIds[key].productReferenceId === productReferenceId &&
        workstationIds[key].hardwareID === hardwareID &&
        key !== identity
      ) {
        isDuplicate = true;

        return;
      }
    });
    if (isDuplicate) {
      handleSetError("This Workstation ID has already been used");
      setIsValid(false);
      return;
    }

    const result = await useCheckHardwareId(hardwareID);
    if (result.status === 200) {
      setIsValid(true);
      handleSetError();
      setWorkstationIds((prevWorkstationIds) => {
        return {
          ...prevWorkstationIds,
          [identity]: { hardwareID, productReferenceId },
        };
      });
      return;
    }
    setIsValid(false);
    handleSetError("Invalid workstation Id");
    console.log("invalid");
    return;
  };

  return (
    <div className="workstation-id-field-wrapper">
      <style jsx>{`
        .workstation-id-field-wrapper {
          margin-bottom: 0.5em;
        }
        .workstation-id-field-details {
          display: flex;
          gap: 1em;
        }
        .workstation-id-field-wrapper__name,
        .workstation-id-field-wrapper__duration {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .icon-wrapper {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          margin: -0.4em 0;
          margin-bottom: -0.6em;

          font-size: 1.2em;
        }
        .input-outer {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .suggestions-dropdown-wrapper {
          position: absolute;
          top: calc(
            100% + var(--border-width-1) * 4 - var(--fs-input-label) * 2
          );
          left: 0;
          width: calc(100%);
          z-index: 3;
          border-radius: 0 0 9px 9px;
          overflow: hidden;
          border: 2px solid var(--clr-primary);
          border-top: none;
          box-shadow: var(--shadow-2);

          background-color: var(--clr-neutral-50);
        }
        .suggestions-wrapper {
          position: relative;
        }
        .suggestions-close-overlay {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          opacity: 0;
          z-index: -1;
          background-color: var(--clr-neutral-800);
        }
        .suggestions-dropdown_title {
          font-size: 1.1em;
          margin: 0;
          max-width: 100%;
          font-weight: 500;
          padding: 0.3em;
          margin-top: 0.3em;
          text-align: center;
          border-bottom: 1px solid var(--clr-primary);
          color: var(--clr-neutral-800);
        }
        .suggestions-dropdown {
          list-style: none;
          padding: 0;
          margin: 0;

          padding-bottom: 2em;

          width: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1em;
          max-height: 330px;
        }
        .suggestion-item {
          padding: 0.5em 1em;
          cursor: pointer;
          border-radius: 9px;
          color: var(--clr-neutral-800);
          transition: all 0.2s ease-in-out;
          border: 1px solid var(--clr-primary);
        }
        .suggestion-item:hover {
          background-color: var(--clr-primary);
          color: var(--clr-neutral-50);
          transform: scale(1.06);
        }

        .suggestion-item:nth-child(1) {
          margin-top: 1em !important;
        }
      `}</style>
      <div className="workstation-id-field-details">
        <div className="workstation-id-field-wrapper__icon">
          <img
            src={`images/icons/${item.id}.png`}
            width={50}
            height={50}
            layout="intrinsic"
          />
        </div>
        <div className="workstation-id-field-wrapper__name">
          <span>{item.name}</span>
          {Object.keys(item.options).map((option, index) => (
            <span
              key={`${item.options[option][0]}_${index}`}
              className="font-size-xs"
            >
              {item.options[option][0]}
            </span>
          ))}
        </div>

        <div className="workstation-id-field-wrapper__duration">
          {item.paymentPlan === "rent" && (
            <>
              <span>Rent duration:</span>
              <span className="font-size-xs">
                {item.rentDuration} {item.rentDuration > 1 ? "months" : "month"}
              </span>
            </>
          )}
          {item.paymentPlan !== "rent" && (
            <>
              <span>Payment Type:</span>
              <span className="font-size-xs">{item.paymentPlan}</span>
            </>
          )}
        </div>
        {error && dirty && <div className="error">{error}</div>}
        {isValid && dirty && (
          <div className="success">Valid workstation Id</div>
        )}
      </div>
      <div className="icon-wrapper">🔗</div>
      <div className="input-outer">
        {" "}
        {isFocused && usedWorkstationIds.length > 0 && (
          <div className="suggestions-dropdown-wrapper">
            <div className="suggestions-wrapper">
              <div
                className="suggestions-close-overlay"
                onClick={() => {
                  setIsFocused(false);
                }}
              ></div>

              <h4 className="suggestions-dropdown_title">
                Previously used ids
              </h4>
              <ul className="suggestions-dropdown">
                {usedWorkstationIds.map((usedWorkstationId) => {
                  if (!idsProductAlradyHas.includes(usedWorkstationId)) {
                    return (
                      <li
                        className="suggestion-item"
                        key={usedWorkstationId}
                        onClick={() => {
                          hardwareIDRef.current.value = usedWorkstationId;
                          setDirty(true);
                          handleBlur();
                          setIsFocused(false);
                        }}
                      >
                        {usedWorkstationId}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          </div>
        )}{" "}
        <CustomInput
          reference={hardwareIDRef}
          type="text"
          name={identity}
          placeholder="Workstation ID"
          value={workstationIds[identity]?.hardwareID}
          handleBlur={() => {
            handleBlur();
          }}
          handleClick={() => {
            setIsFocused(true);
          }}
          handleChange={(e) => {
            setDirty(true);
            setWorkstationIds((prevWorkstationIds) => {
              const newWorkstationIds = { ...prevWorkstationIds };
              newWorkstationIds[identity] = {
                hardwareID: e.target.value,
                productReferenceId,
              };
              return newWorkstationIds;
            });
          }}
        />
      </div>
    </div>
  );
}
