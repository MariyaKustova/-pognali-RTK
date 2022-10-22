import { get } from "lodash";

import { DialogFormValues } from "./types";

export const checkMessageLength = (
  values: DialogFormValues,
  errors: {[key: string]: string},
  code: string
) => {
  const parameterName = get(values, code);
  if (
    (typeof parameterName === "string" && parameterName.trim().length > 300)
  ) {
    errors[code] = "The message length cannot be more than 300 characters";
  }
};

export const validateMessage = (values: DialogFormValues) => {
const errors = {};
checkMessageLength(values, errors, 'newMessage')
return { values, errors };
};