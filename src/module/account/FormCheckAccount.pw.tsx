import { useNavigate } from "react-router-dom";
import { Header } from ".";
import { IconBack } from "../../components/icon";
import { Button } from "../../components/button";
import Field from "../../components/fields";
import { Label } from "../../components/label";
import { InputForm } from "../../components/input";
import { ErrorInput } from "../../components/error";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import IconError from "./../../components/icon/IconError";

type TFormCheckAccountProps = {
  handleSetAccount: (name: string) => void;
  handleActiveForm: (form: string) => void;
};

const validatingSchema = Yup.object({
  emailOrPhone: Yup.string()
    .required("Vui lòng điền vào mục này")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@gmail.com$|(0[3|5|7|8|9])+([0-9]{8})\b/,
      "Email hoặc Số điện thoại không hợp lệ"
    ),
});

type formValues = Yup.InferType<typeof validatingSchema>;

function FormCheckAccount({
  handleSetAccount,
  handleActiveForm,
}: TFormCheckAccountProps) {
  const navigate = useNavigate();
  const [checkAccount, setCheckAccount] = useState<boolean>(true);

  const onSubmit = (data: formValues) => {
    handleActiveForm("checkCodeOtp");
    setCheckAccount(false);
    handleSetAccount(data?.emailOrPhone);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({
    defaultValues: {
      emailOrPhone: "",
    },
    resolver: yupResolver(validatingSchema),
    mode: "onChange",
  });

  return (
    <div className="w-full checkAccount">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center font-bold cursor-pointer gap-x-2 text-blue hover:text-orange"
      >
        <IconBack size={30}></IconBack>
      </div>
      <Header title="Xác minh tài khoản"></Header>
      {!checkAccount && (
        <div className="flex items-center w-full px-2 py-2 mt-2 text-sm text-red-600 border-red-600 rounded border-1 gap-x-2">
          <IconError size={15}></IconError>
          Không tìm thấy tài khoản
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-5 gap-y-10"
      >
        <Field variant="flex-col">
          <Label htmlFor="emailOrPhone">Email/Số điện thoại:</Label>
          <InputForm
            control={control}
            type="text"
            name="emailOrPhone"
            id="emailOrPhone"
            placeholder="Nhập..."
            error={errors["emailOrPhone"] ? true : false}
          />
          <ErrorInput text={errors["emailOrPhone"]?.message} />
        </Field>
        <div className="text-center">
          <Button type="submit" variant="default" disabled={true}>
            kiểm tra
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FormCheckAccount;
