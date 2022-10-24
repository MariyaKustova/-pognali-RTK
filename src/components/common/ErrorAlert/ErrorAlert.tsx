import React, { FC, useEffect, useState } from "react";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import s from "./ErrorAlert.module.scss";

interface ErrorAlertProps {
  error: string | FetchBaseQueryError | SerializedError;
  resetError: () => void;
}

// type Guard

const isString = (
  error: string | FetchBaseQueryError | SerializedError
): error is string => {
  return typeof error === "string";
};

const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError
): error is FetchBaseQueryError => {
  return "code" in error ? false : true;
};

const ErrorAlert: FC<ErrorAlertProps> = ({ error, resetError }) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      resetError();
    }, 3000);
  }, []);

  const messageError = isString(error)
    ? error
    : !isFetchBaseQueryError(error)
    ? error.message
    : error.status;

  return open ? <div className={s.ErrorAlert}>{messageError}</div> : null;
};

export default ErrorAlert;
