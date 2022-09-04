import styles from "../services_portal.module.css";
import { useClient } from "../../../lib/context";
import CustomInput from "../../inputs/customInput";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
export default function EditAccount() {
  const { getClientInfo } = useClient();
  return (
    <div className={styles.content}>
      <div className={styles.title_wrapper}>
        <h2>Account Information</h2>
      </div>
      <div className={styles.content_inner_edit_account}>
        <div className={styles.email_username_section}>
          <CustomInput
            default={getClientInfo().SiteUser}
            type="text"
            placeholder="Username"
            isDisabled
          />
          <ChangeEmail />
        </div>
      </div>
      <ChangePassword />
    </div>
  );
}
