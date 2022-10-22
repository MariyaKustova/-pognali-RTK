import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import classnames from "classnames";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import { State } from "../../../../redux/reduxStore";
import BaseInput from "../../../../components/common/BaseInput/BaseInput";
import { getAuth } from "../../../../redux/selectors.ts/authSelectors";
import {
  useGetStatusQuery,
  useUpdateStatusMutation,
} from "../../../../redux/API/profile";

import s from "./ProfileStatus.module.scss";

interface ProfileStatusProps {
  userId: number;
  setError: (
    error: FetchBaseQueryError | SerializedError | string | undefined
  ) => void;
}

const ProfileStatus: FC<ProfileStatusProps> = ({ userId, setError }) => {
  const auth = useSelector((state: State) => getAuth(state));
  const { data: status, error: getStatusError } = useGetStatusQuery(userId);
  const [updateUserStatus] = useUpdateStatusMutation();

  const [userStatus, setUserStatus] = useState<string>(status || "");
  const [editMode, setEditMode] = useState<boolean>(false);

  const isOwner = useMemo(() => userId === auth?.id, [userId, auth]);

  useEffect(() => {
    setUserStatus(status || "");
  }, [status]);

  useEffect(() => {
    if (getStatusError) {
      setError(getStatusError);
    }
  }, [getStatusError, setError]);

  const onToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, [setEditMode]);

  const onChangeStatus = useCallback(() => {
    updateUserStatus(userStatus)
      .unwrap()
      .catch(() => setError("Unfortunately, the status could not be updated!"));
    onToggleEditMode();
  }, [updateUserStatus, onToggleEditMode, setError, userStatus]);

  return (
    <div
      className={classnames(s.ProfileStatus, {
        [s.ProfileStatus__Owner]: isOwner,
      })}
    >
      {editMode && isOwner ? (
        <div className={s.ProfileStatus__Modal}>
          <span className={s.ProfileStatus__Hint}>Введите ваш статус</span>
          <BaseInput
            value={userStatus}
            onBlur={onChangeStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            className={s.ProfileStatus__input}
          />
        </div>
      ) : (
        <div onClick={onToggleEditMode}>
          {status || isOwner ? "Установите ваш статус" : ""}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
