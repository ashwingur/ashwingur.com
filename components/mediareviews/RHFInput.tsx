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
}

const RHFInput: React.FC<RHFInputProps> = ({
  label,
  register,
  errors,
  className,
  inputClassName = "input-bg",
  labelClassName,
  ...props
}) => {
  return (
    <div className={clsx(className)}>
      <label className={labelClassName}>{label}</label>
      <input
        className={inputClassName}
        {...register}
        aria-invalid={errors !== undefined}
        autoComplete="off"
        {...props}
      />
      <p className="text-error">{errors?.message}</p>
    </div>
  );
};

export default RHFInput;
