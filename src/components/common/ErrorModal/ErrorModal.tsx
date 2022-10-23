import React, { FC, useCallback, useState } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";

import s from "./ErrorModal.module.scss";

interface ErrorModalProps {
  error: FetchBaseQueryError | SerializedError;
  isOpen: boolean;
  onClick?: () => void;
}

const ErrorModal: FC<ErrorModalProps> = ({ error, isOpen, onClick }) => {
  const [open, setOpen] = useState<boolean>(isOpen);
  const hideModal = useCallback(() => {
    setOpen(false);
    onClick && onClick();
  }, [onClick]);

  return (
    <>
      {open ? (
        <div className={s.ErrorModal} onClick={hideModal}>
          <div className={s.ErrorModal__Modal}>
            <h1>Error!</h1>
            <p>{'error' in error ? error.error : null}</p>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ErrorModal;
