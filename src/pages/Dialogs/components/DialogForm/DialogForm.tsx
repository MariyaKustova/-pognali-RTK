import React, { FC, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

import TextArea from "../../../../components/common/TextArea/TextArea";
import { validateMessage } from "../../helpers";
import { DialogFormValues } from "../../types";

interface DialogFormProps {
  onSubmit: (values: DialogFormValues) => void;
}

const defaultValues = {
  newMessage: "",
};

const DialogForm: FC<DialogFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues, 
    resolver: validateMessage,
  });

  const onHandleSubmit = useCallback((values: DialogFormValues) => {
    onSubmit(values);
    reset(defaultValues);
  }, [onSubmit, reset]);

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <Controller
        name={"newMessage"}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextArea
              {...field}
              {...fieldState}
              label="Add message"
              placeholder="Add new message"
            />
          );
        }}
      />
    </form>
  );
};

export default DialogForm;
