import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DialogsState {
  dialogsData: { id: string; name: string }[];
  messagesData: { id: string; message: string }[];
}

const initialState: DialogsState = {
  dialogsData: [
    {
      id: "1",
      name: "Dima",
    },
    {
      id: "2",
      name: "Anna",
    },
    {
      id: "3",
      name: "Sveta",
    },
    {
      id: "4",
      name: "Ann",
    },
    {
      id: "5",
      name: "Alex",
    },
    {
      id: "6",
      name: "Antony",
    },
  ],
  messagesData: [
    {
      id: "1",
      message: "Hi!",
    },
    {
      id: "2",
      message: "WOW",
    },
    {
      id: "3",
      message: "Hi!!!",
    },
    {
      id: "4",
      message: "Hello!",
    },
    {
      id: "5",
      message: "Good morning!",
    },
    {
      id: "6",
      message: "Rrrr...",
    },
  ],
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setNewMessage: (state, action: PayloadAction<string>) => {
      const newMessage = {
        id: "7",
        message: action.payload,
      };
      state.messagesData.push(newMessage);
    },
  },
});

export const { setNewMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer;
