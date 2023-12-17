import { Link } from "react-router-dom";
import { Header } from "../module/account";
import { cn } from "../utils";
import Field from "../components/fields";
import { Label } from "../components/label";
import { InputForm } from "../components/input";
import { ErrorInput } from "../components/error";
import { Button } from "../components/button";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const validatingSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("Vui lòng điền vào mục này.")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
});

type formValue = Yup.InferType<typeof validatingSchema>;

function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<formValue>({
    defaultValues: { phoneNumber: "" },
    resolver: yupResolver(validatingSchema),
    mode: "onChange",
  });

  const onSubmit = (data: formValue) => console.log(data);

  return (
    <div className="flex flex-col justify-center w-full px-10 pt-16">
      <Header title={"Đăng ký"}></Header>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-5 gap-y-7"
      >
        <Field variant="flex-col">
          <Label htmlFor="phoneNumber"> Mật khẩu:</Label>
          <InputForm
            control={control}
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Nhập số..."
            error={errors["phoneNumber"] ? true : false}
            className={{
              input:
                dirtyFields.phoneNumber && !errors["phoneNumber"]
                  ? "border-green text-green"
                  : "",
            }}
          />
          <ErrorInput text={errors["phoneNumber"]?.message} />
        </Field>
        <div className="text-center">
          <Button
            type="submit"
            disabled={errors ? true : false}
            variant="default"
          >
            Đăng ký
          </Button>
        </div>
      </form>
      <div
        className={cn(
          "mt-10 w-full text-sm text-gray relative",
          "before:absolute before:w-full before:h-[1px] before:bg-gray before:inset-0",
          "after:content-['Hoặc'] after:absolute after:left-1/2 after:-translate-x-1/2 after:top-[-10px] after:inline-block after:bg-white after:w-12 after:text-center"
        )}
      ></div>
      <div className="flex justify-center mt-5">
        <Button type="button" variant="outLine-flex">
          <img alt="" srcSet="/google.png" className="w-7" />
          <span className="text-sm">Đăng ký với email</span>
        </Button>
      </div>
      <div className="mt-5 text-sm text-center text-gray">
        Bạn đã có tài khoản?
        <Link to="/" className="ml-1 font-semibold text-blue hover:text-orange">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}

export default SignUpPage;
