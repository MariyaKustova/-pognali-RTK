import { State } from "../reduxStore";

export const getDialogsData = (state: State) => state.dialogs.dialogsData;

export const getMessagesData = (state: State) => state.dialogs.messagesData;