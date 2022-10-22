import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import DialogItem from "./components/DialogItem/DialogItem";
import MessageItem from "./components/MessageItem/MessageItem";
import { Dialog, Message } from "./types";
import DialogForm from "./components/DialogForm/DialogForm";
import { AppDispatch, State } from "../../redux/reduxStore";
import { getDialogsData, getMessagesData } from "../../redux/selectors.ts/dialogsSelectors";
import { setNewMessage } from "../../redux/slices/dialogsSlice";

import s from "./Dialogs.module.scss";

const Dialogs = () => {
  const dialogsData = useSelector((state: State) => getDialogsData(state));
  const messagesData = useSelector((state: State) => getMessagesData(state));
  const dispatch = useDispatch<AppDispatch>();
  
  const onSubmit = useCallback((values: {newMessage: string}) => {
    values.newMessage.length && dispatch(setNewMessage(values.newMessage));
  }, [dispatch]);

  return (
    <div className={s.Dialogs}>
      <div className={s.Dialogs__Wrapper}>
        <ul className={s.Dialogs__List}>
          {dialogsData.map((dialog: Dialog, index: number) => (
            <DialogItem key={index} path={dialog.id} content={dialog.name} />
          ))}
        </ul>
        <div>
          <ul className={s.Dialogs__List}>
            {messagesData.map((message: Message, index: number) => (
              <MessageItem key={index} message={message.message} />
            ))}
          </ul>          
        </div>
      </div>
      <DialogForm onSubmit={onSubmit} />
    </div>
  );
};

export default Dialogs;
