import { forwardRef } from "react";
import { IInputProps } from "../../types/InputType";
import { cn } from "../../utils";

type Ref = HTMLInputElement;

const Input = forwardRef<Ref, IInputProps>((props, ref) => {
  const { className, value, placeholder, children, error, ...rest } = props;
  return (
    <div className={cn("input-wrap relative w-full", className?.wrap)}>
      <input
        ref={ref}
        {...rest}
        placeholder={placeholder}
        value={value}
        onFocus={(event) => {
          event.target.placeholder = "";
        }}
        onBlur={(event) => {
          if (!value && placeholder) {
            event.target.placeholder = placeholder;
          }
        }}
        className={cn(
          "w-full px-2 py-2 text-lg duration-300 border-[1px] rounded-lg outline-none placeholder:text-sm border-grayCa ",
          error ? "border-red-600" : "",
          className?.input
        )}
      />
      {children}
    </div>
  );
});

export default Input;
