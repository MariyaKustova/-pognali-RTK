export interface Dialog {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  message: string;
}

export interface DialogFormValues {
  newMessage: string;
}
