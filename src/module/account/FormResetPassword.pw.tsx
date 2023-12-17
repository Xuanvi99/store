import { useEffect, useState } from "react";
import { Header } from ".";
import {
  IconBack,
  IconError,
  IconSuccess,
  IconTick,
  IconEye,
} from "../../components/icon";
import { cn } from "../../utils";
import { useToggle } from "../../hook";
import Button from "../../components/button/Button";
import Field from "../../components/fields";
import { Label } from "../../components/label";
import { InputForm } from "../../components/input";
import { useForm } from "react-hook-form";

function FormResetPassword({
  handleActiveForm,
  title,
}: {
  handleActiveForm: (form: string) => void;
  title: string;
}) {
  const [checkError, setCheckError] = useState<boolean>(true);

  const { toggle: showPW, handleToggle: handleShowPW } = useToggle();

  const [success, setSuccess] = useState<boolean>(false);

  const handleCheckError = (isCheck: boolean) => {
    setCheckError(isCheck);
  };

  const {
    control,
    handleSubmit,
    watch,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className="w-full checkCode">
      <div
        onClick={() => handleActiveForm("checkCodeOtp")}
        className="flex items-center font-bold cursor-pointer gap-x-2 text-blue hover:text-orange"
      >
        <IconBack size={30}></IconBack>
      </div>
      <Header title={title}></Header>
      {!success && (
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col mt-5 gap-y-2"
        >
          <Field variant="flex-col">
            <Label htmlFor="password">Tạo mật khẩu mới:</Label>
            <div className="relative w-full">
              <InputForm
                control={control}
                type={showPW ? "text" : "password"}
                name="password"
                id="password"
                error={checkError}
                placeholder="Mật khẩu mới..."
                className={{
                  input: dirtyFields.password
                    ? checkError
                      ? ""
                      : " border-green"
                    : "border-gray",
                }}
              />
              <IconEye
                size={20}
                onClick={handleShowPW}
                isOpenEye={showPW}
                className="absolute -translate-y-1/2 top-1/2 right-2"
              ></IconEye>
            </div>
          </Field>
          <ErrorPassword
            isDirtyField={dirtyFields.password ? true : false}
            password={watch("password")}
            onCheckError={handleCheckError}
          />
          <div className="mt-5 text-center">
            <Button
              type="button"
              variant="default"
              disabled={checkError}
              onClick={() => setSuccess(true)}
            >
              Tiếp theo
            </Button>
          </div>
        </form>
      )}
      {success && (
        <div className="flex flex-col items-center justify-center mt-10 text-green">
          <IconSuccess size={100}></IconSuccess>
          <div className="flex flex-col mt-10 text-center text-grayDark gap-y-5">
            <p className="text-lg font-bold">
              Bạn sẽ chuyển đến trang đăng nhập sau
            </p>
            <span>5 giây</span>
          </div>
        </div>
      )}
    </div>
  );
}

const ErrorPassword = ({
  password,
  isDirtyField,
  onCheckError,
}: {
  password: string;
  isDirtyField: boolean;
  onCheckError: (isCheck: boolean) => void;
}) => {
  const [checkQuantity, setCheckQuantity] = useState<boolean>(false);
  const [checkLowerCapitalize, setCheckLowerCapitalize] =
    useState<boolean>(false);
  const [checkNumber, setCheckNumber] = useState<boolean>(false);
  const [checkSpecial, setCheckSpecial] = useState<boolean>(true);

  useEffect(() => {
    if (password) {
      setCheckQuantity(password.match(/^[a-zA-Z0-9\W]{8,16}$/) ? true : false);
      setCheckLowerCapitalize(
        password.match(/[a-z]{1,}/) && password.match(/[A-Z]{1,}/)
          ? true
          : false
      );
      setCheckNumber(password.match(/[0-9]{1,}/) ? true : false);
      setCheckSpecial(password.match(/^(?!.*\W)(?!.*\s)/) ? true : false);
    }
    onCheckError(
      checkQuantity && checkLowerCapitalize && checkNumber && checkSpecial
        ? false
        : true
    );
  }, [
    checkLowerCapitalize,
    checkNumber,
    checkQuantity,
    checkSpecial,
    onCheckError,
    password,
  ]);

  const listError = [
    { status: checkQuantity, text: "8-16 kí tự." },
    {
      status: checkLowerCapitalize,
      text: "Ít nhất một kí tự viết thường,viết hoa.",
    },
    { status: checkNumber, text: "Ít nhất một kí tự số." },
    { status: checkSpecial, text: "Không ký tự đặc biệt và khoảng trắng." },
  ];

  return (
    <ul className="flex flex-col mt-3 text-sm gap-y-2">
      {listError.map((error, index) => {
        return (
          <ErrorItem
            key={index}
            isDirtyField={isDirtyField}
            checkError={error.status}
            text={error.text}
          />
        );
      })}
    </ul>
  );
};

const ErrorItem = ({
  text,
  isDirtyField,
  checkError,
}: {
  text: string;
  isDirtyField: boolean;
  checkError: boolean;
}) => {
  return (
    <li
      className={cn(
        "flex items-start gap-x-2",
        isDirtyField
          ? !checkError
            ? "text-red-600"
            : "text-green"
          : "text-gray"
      )}
    >
      {isDirtyField && (
        <span>
          {!checkError ? (
            <IconError size={15}></IconError>
          ) : (
            <IconTick size={20}></IconTick>
          )}
        </span>
      )}
      {text}
    </li>
  );
};

export default FormResetPassword;
