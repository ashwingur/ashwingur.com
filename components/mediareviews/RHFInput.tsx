import clsx from "clsx";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface RHFInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  submitOnEnter?: boolean;
}

const RHFInput: React.FC<RHFInputProps> = ({
  label,
  register,
  errors,
  className,
  inputClassName = "input-bg",
  labelClassName,
  submitOnEnter = false,
  ...props
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !submitOnEnter) {
      event.preventDefault(); // Prevent form submission on Enter key press
    }
  };
  return (
    <div className={clsx(className)}>
      <label className={labelClassName}>{label}</label>
      <input
        className={inputClassName}
        {...register}
        aria-invalid={errors !== undefined}
        autoComplete="new-password"
        onKeyDown={handleKeyPress}
        {...props}
      />
      <p className="ml-2 text-error">{errors?.message}</p>
    </div>
  );
};

export default RHFInput;
