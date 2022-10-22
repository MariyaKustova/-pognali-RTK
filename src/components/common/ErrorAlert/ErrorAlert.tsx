import React, { FC, useEffect, useState } from "react";
import { has } from "lodash";

import s from "./ErrorAlert.module.scss";

interface ErrorAlertProps {
  error: string | any;
  resetError: () => void;
}

const ErrorAlert: FC<ErrorAlertProps> = ({ error, resetError }) => {
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
      resetError();
    }, 3000);
  }, []);

  const messageError =
    typeof error === "string"
      ? error
      : has(error, "data.message")
      ? error.data.message
      : error.status;

  return open ? <div className={s.ErrorAlert}>{messageError}</div> : null;
};

export default ErrorAlert;
