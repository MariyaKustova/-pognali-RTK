import React, { FC, useMemo } from "react";
import { FieldError } from "react-hook-form";

import { capitalizeFirstLetter } from "../../../utils";

import s from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: FieldError | string;
}

// type Guard

const isString = (message: FieldError | string): message is string => {
  return typeof message === "string";
};

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const errorMessage = useMemo(() => {
    if (isString(message)) {
      return message;
    }
    return message.message;
  }, [message]);

  return errorMessage ? (
    <div className={s.ErrorMessage}>{capitalizeFirstLetter(errorMessage)}</div>
  ) : null;
};

export default ErrorMessage;
