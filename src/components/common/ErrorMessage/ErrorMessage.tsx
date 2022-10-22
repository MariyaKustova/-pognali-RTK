import React, { FC } from "react";
import _ from 'lodash';

import s from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: any;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={s.ErrorMessage}>
      {_.has(message, 'error') ? message.error : message}
    </div>
  );
};

export default ErrorMessage;
