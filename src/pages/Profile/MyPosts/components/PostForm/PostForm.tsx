import React, { FC, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import TextArea from "../../../../../components/common/TextArea/TextArea";

interface PostFormProps {
  onSubmit: (values: { newPost: string }) => void;
}

const schema = yup
  .object({
    newPost: yup
      .string()
      .max(1000, "The message length cannot be more than 1000 characters")
      .required(),
  })
  .required();

const defaultValues = {
  newPost: "",
};

const PostForm: FC<PostFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = useCallback(
    (values: { newPost: string }) => {
      onSubmit(values);
      reset(defaultValues);
    },
    [onSubmit, reset]
  );

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <Controller
        name={"newPost"}
        control={control}
        render={({ field, fieldState }) => {
          return <TextArea {...field} {...fieldState} />;
        }}
      />
    </form>
  );
};

export default PostForm;
