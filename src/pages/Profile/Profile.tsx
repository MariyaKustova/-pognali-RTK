import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { ProfileFormValues } from "./types";
import MyPosts from "./MyPosts/MyPosts";
import IconUser from "../../assets/images/user-icon.svg";
import IconEdit from "../../assets/images/edit-icon.svg";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import ProfileInfoForm from "./components/ProfileInfoForm/ProfileInfoForm";
import { State } from "../../redux/reduxStore";
import Loader from "../../components/common/Loader/Loader";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";
import {
  useGetProfileQuery,
  useSavePhotoMutation,
  useSaveProfileMutation,
} from "../../redux/API/profile";
import { getAuth } from "../../redux/selectors.ts/authSelectors";
import { ROUTE_PATH } from "../../constants";

import s from "./Profile.module.scss";

const Profile = () => {
  const params = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state: State) => getAuth(state));
  const userId = params.userId || auth.id;
  const { data: userProfile, error: profileError } = useGetProfileQuery(
    Number(userId),
    {
      skip: !userId,
    }
  );
  const [saveProfile, { data: profileData, error: saveProfileError }] =
    useSaveProfileMutation();
  const [savePhoto, { error: savePhotoError }] = useSavePhotoMutation();
  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | string | undefined
  >(profileError || saveProfileError || savePhotoError);

  useEffect(() => {
    if (!userId) {
      navigate(ROUTE_PATH.MAIN);
    }
  }, [userId, navigate]);

  useEffect(() => {
    if (profileError || saveProfileError || savePhotoError) {
      setError(profileError || saveProfileError || savePhotoError);
    }
  }, [profileError, saveProfileError, savePhotoError]);

  const isOwner = useMemo(
    () => userProfile?.userId === auth?.id,
    [userProfile, auth]
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const onPhotoDownload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files) savePhoto(e.currentTarget.files[0]);
    },
    [savePhoto]
  );

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      saveProfile(values);
      setEditMode(false);
    },
    [saveProfile, setEditMode]
  );

  return (
    <>
      {!!error && (
        <ErrorAlert error={error} resetError={() => setError(undefined)} />
      )}
      {userProfile ? (
        <div className={s.Profile}>
          <div className={s.Profile__WrapperPhoto}>
            <img
              className={s.Profile__Photo}
              src={userProfile?.photos.large || IconUser}
              alt="Фотография пользователя"
            />
            {isOwner && (
              <div className={s.Profile__WrapperInput}>
                <form>
                  <label className={s.Profile__Label}>
                    Выберите файл
                    <input
                      className={s.Profile__InputFile}
                      type="file"
                      onChange={onPhotoDownload}
                    />
                  </label>
                </form>
              </div>
            )}
          </div>
          {editMode ? (
            <ProfileInfoForm
              onSubmit={onSubmit}
              {...userProfile}
              errorMessage={
                profileData?.resultCode !== 0
                  ? (profileData?.data as string)
                  : null
              }
            />
          ) : (
            <>
              <ProfileInfo setError={setError} {...userProfile} />
              {isOwner && (
                <div className={s.Profile__EditWrapper}>
                  <button
                    className={s.Profile__ButtonEdit}
                    onClick={() => setEditMode(true)}
                  >
                    <img
                      className={s.Profile__IconEdit}
                      src={IconEdit}
                      alt="Редактирование профиля"
                    />
                  </button>
                  <div className={s.Profile__Tooltip}>Editing profile</div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}
      <MyPosts />
    </>
  );
};

export default Profile;
