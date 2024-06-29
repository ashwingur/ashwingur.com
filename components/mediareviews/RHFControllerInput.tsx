import React, { ReactNode } from "react";
import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface RHFControllerInputProps {
  label: string;
  errors?: FieldError | undefined;
  className?: string;
  children: ReactNode;
}

const RHFControllerInput: React.FC<RHFControllerInputProps> = ({
  label,
  errors,
  className,
  children,
}) => {
  return (
    <div className={clsx(className)}>
      <label className="">{label}</label>
      <div className="">{children}</div>
      <p className="text-error">{errors?.message}</p>
    </div>
  );
};

export default RHFControllerInput;
