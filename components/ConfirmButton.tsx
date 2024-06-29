import clsx from "clsx";
import React, { ReactNode, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

// Button with a yes or no confirmation, the yes confirmation has a customisable delay

interface ConfirmButtonProps {
  content?: JSX.Element | string;
  className?: string;
  mainBtnClassName?: string;
  confirmBtnClassName?: string;
  onConfirmClick: () => void;
  confirmDelay?: number;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  className,
  content,
  mainBtnClassName,
  confirmBtnClassName,
  onConfirmClick,
  confirmDelay = 2000,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [canClick, setCanClick] = useState(false);

  const handleClick = () => {
    setConfirm(true);
    setTimeout(() => {
      setCanClick(true);
    }, confirmDelay);
  };

  const handleConfirm = () => {
    onConfirmClick();
    setConfirm(false);
    setCanClick(false); // Reset canClick state after confirming
  };

  if (!confirm) {
    return (
      <button
        className={clsx(mainBtnClassName, className)}
        onClick={handleClick}
      >
        {content}
      </button>
    );
  } else {
    return (
      <div className={clsx(className)}>
        <button
          className={clsx(confirmBtnClassName)}
          onClick={() => {
            setConfirm(false);
            setCanClick(false);
          }}
        >
          <FaTimes />
        </button>
        <button
          className={clsx(confirmBtnClassName)}
          onClick={canClick ? handleConfirm : undefined}
          disabled={!canClick}
        >
          <FaCheck />
        </button>
      </div>
    );
  }
};

export default ConfirmButton;
