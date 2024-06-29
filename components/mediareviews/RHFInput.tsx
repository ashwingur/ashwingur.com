import clsx from "clsx";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface RHFInputProps {
  label: string;
  register: UseFormRegisterReturn;
  errors: FieldError | undefined;
  type?: React.HTMLInputTypeAttribute;
  step?: string;
  className?: string;
}

const RHFInput: React.FC<RHFInputProps> = ({
  label,
  register,
  errors,
  type = "text",
  step,
  className,
}) => {
  return (
    <div className={clsx(className)}>
      <label className="">{label}</label>
      <input
        className="input"
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
