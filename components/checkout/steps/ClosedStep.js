import styles from "./steps.module.css";
import { cartState } from "../../../lib/cartContext";
export default function ClosedStep({
  stepNumber,
  stepName,
  isValid,
  stepId,
  isDirty,
}) {
  const { dispatch } = cartState();

  return (
    <div
      className={styles.billing}
      onClick={() => {
        dispatch({
          type: "SET_STEP_TO_BE_ACTIVE",
          payload: stepNumber - 1,
        });
      }}
    >
      <div
        className={`${styles.billing__inner} ${
          isValid ? styles.valid : styles.invalid
        }`}
        data-step={stepNumber}
      >
        <h3
          className={`${styles.billing__title} ${
            isDirty
              ? stepId === "payment"
                ? ""
                : isValid
                ? styles.valid
                : styles.invalid
              : ""
          }`}
        >
          {stepName}
        </h3>
      </div>
    </div>
  );
}
