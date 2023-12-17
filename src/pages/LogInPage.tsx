import { Link } from "react-router-dom";
import { cn } from "../utils";
import { Header } from "../module/account";
import { Label } from "../components/label";
import Field from "../components/fields";
import { InputForm } from "../components/input";
import { ErrorInput } from "../components/error";
import { Button, ButtonGoogle } from "../components/button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToggle } from "../hook";
import { IconEye } from "../components/icon";

const validationSchema = Yup.object({
  emailOrPhone: Yup.string()
    .required("Vui lòng điền vào mục này.")
    .matches(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@gmail.com$|(84|0[3|5|7|8|9])+([0-9]{8})\b/,
      "Email hoặc Số điện thoại không hợp lệ"
    ),
  password: Yup.string().required("Vui lòng điền vào mục này."),
});

type FormValues = Yup.InferType<typeof validationSchema>;

function LogInPage() {
  const { toggle: showPW, handleToggle: handleShowPW } = useToggle();

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className="w-full h-full px-10 pt-5 bg-white text-grayDark">
      <Header title="Đăng nhập"></Header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-3 gap-y-3"
      >
        <Field variant="flex-col">
          <Label htmlFor="emailOrPhone">Email/Số điện thoại:</Label>
          <InputForm
            control={control}
            type="text"
            name="emailOrPhone"
            id="emailOrPhone"
            placeholder="Nhập email/số điện thoại..."
            error={errors["emailOrPhone"] ? true : false}
            className={{
              input:
                dirtyFields.emailOrPhone && !errors["emailOrPhone"]
                  ? "border-green text-green"
                  : "",
            }}
          />
          <ErrorInput text={errors["emailOrPhone"]?.message} />
        </Field>
        <Field variant="flex-col">
          <Label htmlFor="password"> Mật khẩu:</Label>
          <InputForm
            control={control}
            type={showPW ? "text" : "password"}
            name="password"
            id="password"
            placeholder="xxxxxx"
            error={errors["password"] ? true : false}
            className={{
              input:
                dirtyFields.password && !errors["password"]
                  ? "border-green "
                  : "",
            }}
          >
            <IconEye
              size={20}
              onClick={handleShowPW}
              isOpenEye={showPW}
              className="absolute -translate-y-1/2 top-1/2 right-2"
            ></IconEye>
          </InputForm>
          <ErrorInput text={errors["password"]?.message} />
        </Field>
        <Link
          to={"/account/forgotPassword"}
          className="text-sm font-semibold text-blue hover:text-orange"
        >
          Quên mật khẩu?
        </Link>
        <div className="text-center">
          <Button
            disabled={errors ? true : false}
            type="submit"
            variant="default"
          >
            Đăng nhập
          </Button>
        </div>
      </form>
      <div
        className={cn(
          "mt-5 w-full text-sm text-gray relative",
          "before:absolute before:w-full before:h-[1px] before:bg-gray before:inset-0",
          "after:content-['Hoặc'] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[-10px] after:inline-block after:bg-white after:w-12 after:text-center"
        )}
      ></div>
      <ButtonGoogle text="Đăng nhập với Google"></ButtonGoogle>
      <div className="mt-5 text-sm text-center text-gray">
        Bạn mới biết đến XVStore?
        <Link to="/" className="ml-1 font-semibold text-blue hover:text-orange">
          Đăng ký
        </Link>
      </div>
    </div>
  );
}

export default LogInPage;
