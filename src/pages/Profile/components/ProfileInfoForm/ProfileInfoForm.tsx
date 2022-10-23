import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { ProfileFormValues, ProfileInfoFormProps } from "../../types";
import { BASE_INFO, CONTACTS, defaultValues, FieldNames } from "./constants";
import { createController } from "../../../Login/LoginForm/helpers";
import Button from "../../../../components/common/Button/Button";
import Checkbox from "../../../../components/common/Checkbox/Checkbox";
import ErrorMessage from "../../../../components/common/ErrorMessage/ErrorMessage";
import { checkCorrectEmail, checkRequired } from "../../helpers";

import s from "./ProfileInfoForm.module.scss";

export const validateValues = (values: ProfileFormValues) => {
  const errors: Record<string, string> = {};
  BASE_INFO.forEach((code) => checkRequired(values, errors, code));
  CONTACTS.forEach((code) => checkCorrectEmail(values.contacts, errors, code));
  return { values, errors };
};

const ProfileInfoForm: FC<ProfileInfoFormProps> = ({
  aboutMe,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  contacts,
  errorMessage,
  onSubmit,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: validateValues,
  });

  useEffect(() => {
    reset({
      aboutMe,
      lookingForAJob,
      lookingForAJobDescription,
      fullName,
      contacts,
    });
  }, [
    aboutMe,
    lookingForAJob,
    lookingForAJobDescription,
    fullName,
    contacts,
    reset,
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.ProfileInfoForm}>
      {createController(FieldNames.FULL_NAME, control)}
      <Controller
        name={FieldNames.LOOKING_FOR_A_JOB}
        control={control}
        render={({ field }) => <Checkbox {...field} />}
      />
      {createController(FieldNames.LOOKING_FOR_A_JOB_DESCRIPTION, control)}
      {createController(FieldNames.ABOUT_ME, control)}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <div className={s.ProfileInfoForm__contacts}>
        <span>Contacts:</span>
        <div className={s.ProfileInfoForm__contactsWrapper}>
          {CONTACTS.map((contact) => (
            <div key={contact}>
              {createController(`contacts.${contact}`, control)}
            </div>
          ))}
        </div>
      </div>

      <div className={s.ProfileInfoForm__buttonWrapper}>
        <Button
          label="Save"
          type="submit"
          className={s.ProfileInfoForm__button}
        />
      </div>
    </form>
  );
};

export default ProfileInfoForm;
