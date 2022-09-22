import { useState } from "react";
import Button from "../actions/Button";
import { useClient } from "../../lib/context";
export default function UpdateclientinfoComponent({
  billingInfoObjectReferences,
  shippingInfoObjectReferences,
  update = "both",
  text,
  errorCheckingFunction,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const { updateClientInfo } = useClient();

  const handleUpadteInfo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const err = errorCheckingFunction();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);

      return false;
    }

    const newUserInfo = {};
    if (update === "both") {
      newUserInfo.Billing = {
        LegalName: billingInfoObjectReferences.LegalName.current.value,
        ContactName: billingInfoObjectReferences.ContactName.current.value,
        Country: billingInfoObjectReferences.Country.current.value,
        City: billingInfoObjectReferences.City.current.value,
        VatID: billingInfoObjectReferences.VatID.current.value,
        Address: billingInfoObjectReferences.Address.current.value,
        PostCode: billingInfoObjectReferences.PostCode.current.value,
      };
      newUserInfo.Shipping = {
        Recipient: shippingInfoObjectReferences.Recipient.current.value,
        Country: shippingInfoObjectReferences.Country.current.value,
        City: shippingInfoObjectReferences.City.current.value,
        Address: shippingInfoObjectReferences.Address.current.value,
        PostCode: shippingInfoObjectReferences.PostCode.current.value,
        RecipientPhone:
          shippingInfoObjectReferences.RecipientPhone.current.value,
      };
    } else if (update === "billing") {
      newUserInfo.Billing = {
        LegalName: billingInfoObjectReferences.LegalName.current.value,
        ContactName: billingInfoObjectReferences.ContactName.current.value,
        Country: billingInfoObjectReferences.Country.current.value,
        City: billingInfoObjectReferences.City.current.value,
        VatID: billingInfoObjectReferences.VatID.current.value,
        Address: billingInfoObjectReferences.Address.current.value,
        PostCode: billingInfoObjectReferences.PostCode.current.value,
      };
    } else if (update === "shipping") {
      newUserInfo.Shipping = {
        Recipient: shippingInfoObjectReferences.Recipient.current.value,
        Country: shippingInfoObjectReferences.Country.current.value,
        City: shippingInfoObjectReferences.City.current.value,
        Address: shippingInfoObjectReferences.Address.current.value,
        PostCode: shippingInfoObjectReferences.PostCode.current.value,
        RecipientPhone:
          shippingInfoObjectReferences.RecipientPhone.current.value,
      };
    }
    const res = await updateClientInfo(newUserInfo);
    if (res) {
      if (res.status === 200) {
        setIsSuccess(true);
        setIsError(false);
        setErrorMessage("");
      } else {
        setIsError(true);
        setIsSuccess(false);
        setErrorMessage(res.message);
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="save-changes">
      <style jsx>{`
        .save-changes {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          justify-content: center;
          margin-bottom: 3em;
        }
      `}</style>
      {isError && <p className="error">{errorMessage}</p>}
      {isSuccess && <p className="success">Changes saved successfully</p>}
      <Button
        onClick={handleUpadteInfo}
        isLoading={isLoading}
        className="button"
      >
        Update
      </Button>
      {text && <span>{text}</span>}
    </div>
  );
}
