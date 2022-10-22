import React, { FC } from "react";
import classnames from "classnames";

import s from "./Button.module.scss";

interface ButtonProps {
  className?: string;
  label: string;
  type? : "button" | "submit" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const { className, onClick, disabled, label, type } = props;
  return (
    <button
      className={classnames(s.Button, className)}
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
    >
      {label}
    </button>
  );
};

export default Button;
