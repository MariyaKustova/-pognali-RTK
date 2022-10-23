import React, { FC, useMemo } from "react";
import { FieldError } from "react-hook-form";

import { capitalizeFirstLetter } from "../../../utils";

import s from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  message: FieldError | string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  const errorMessage = useMemo(() => {
      if (typeof message === "string") {
        return message;
      }
      return message.message;
  }, [message]);

  return errorMessage ? <div className={s.ErrorMessage}>{capitalizeFirstLetter(errorMessage)}</div> : null;
};

export default ErrorMessage;
