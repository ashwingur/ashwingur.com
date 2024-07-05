import React, { ReactNode } from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface RHFControllerInputProps {
  label: string;
  errors?: FieldError | undefined;
  className?: string;
  children: ReactNode;
  inputClassName?: string;
  labelClassName?: string;
}

const RHFControllerInput: React.FC<RHFControllerInputProps> = ({
  label,
  errors,
  className,
  children,
  inputClassName,
  labelClassName,
}) => {
  return (
    <div className={clsx(className)}>
      <label className={labelClassName}>{label}</label>
      <div className={inputClassName}>{children}</div>
      <p className="text-error ml-2">{errors?.message}</p>
    </div>
  );
};

export default RHFControllerInput;
