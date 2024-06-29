import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface RHFInputProps {
  label: string;
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute;
  step?: string;
  className?: string;
  inputClassName?: string;
}

const RHFInput: React.FC<RHFInputProps> = ({
  label,
  register,
  errors,
  type = "text",
  step,
  className,
  inputClassName = "input-bg",
}) => {
  return (
    <div className={clsx(className)}>
      <label className="">{label}</label>
      <input
        className={inputClassName}
        type={type}
        step={step}
        {...register}
        aria-invalid={errors !== undefined}
      />
      <p className="text-error">{errors?.message}</p>
    </div>
  );
};

export default RHFInput;
