import React, { FC } from "react";

import s from "./MessageItem.module.scss";

interface MessageItemProps {
  message: string;
}

const MessageItem: FC<MessageItemProps> = ({ message }) => {
  return <li className={s.MessageItem}>{message}</li>;
};

export default MessageItem;
