import { useState } from "react";
import {
  FormCheckAccount,
  FormCheckCodeOtp,
  FormResetPassword,
} from "../module/account";

function ForgotPasswordPage() {
  const [account, setAccount] = useState<string>("");

  const [activeForm, setActiveForm] = useState<string>("checkAccount");

  const handleActiveForm = (form: string) => {
    setActiveForm(form);
  };

  const handleSetAccount = (name: string) => {
    setAccount(name);
  };

  return (
    <div className="w-full h-full px-10 pt-16 bg-white text-grayDark">
      {activeForm === "checkAccount" && (
        <FormCheckAccount
          handleSetAccount={handleSetAccount}
          handleActiveForm={handleActiveForm}
        ></FormCheckAccount>
      )}
      {activeForm === "checkCodeOtp" && (
        <FormCheckCodeOtp
          account={account}
          handleActiveForm={handleActiveForm}
        ></FormCheckCodeOtp>
      )}
      {activeForm === "resetPassword" && (
        <FormResetPassword
          title="Thiếp Lập Mật Khẩu"
          handleActiveForm={handleActiveForm}
        ></FormResetPassword>
      )}
    </div>
  );
}

export default ForgotPasswordPage;
