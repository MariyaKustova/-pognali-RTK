import { Control, Controller } from "react-hook-form";

import BaseInput from "../../../components/common/BaseInput/BaseInput";
import { checkEmail, checkRequired } from "../../Profile/helpers";
import { FieldNames } from "./constants";
import { LoginFormValues } from "./types";

export const createController = (
  name: string,
  control: Control<any>,
  props?: { [key: string]: string }
) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <BaseInput {...field} {...fieldState} {...props} />
    )}
  />
);

export const validateValues = (values: LoginFormValues) => {
  const errors = {};
  checkRequired(values, errors, FieldNames.PASSWORD);
  checkEmail(values, errors, FieldNames.EMAIL);
  return {values, errors}
}