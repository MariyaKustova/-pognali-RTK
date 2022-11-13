import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import Button from "../../components/common/Button/Button";
import IconUser from "../../assets/images/user-icon.svg";
import { ROUTE_PATH } from "../../constants";
import { User } from "./types";

import s from "./UserItem.module.scss";

interface UserItemProps extends User {
  follow: (id: number) => void;
  unfollow: (id: number) => void;
}

const UserItem: FC<UserItemProps> = ({
  id,
  name,
  photos,
  location,
  status,
  followed,
  follow,
  unfollow,
}) => {
  return (
    <div className={s.UserItem}>
      <NavLink className={s.UserItem__Link} to={`${ROUTE_PATH.PROFILE}/${id}`}>
        <div className={s.UserItem__ShortInfo}>
          <div className={s.UserItem__Wrapper}>
            <img
              className={s.UserItem__Img}
              src={photos.small ?? IconUser}
              alt="User's avatar"
            />

            {followed ? (
              <Button
                className={s.UserItem__Button}
                label={"Unfollow"}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  event.preventDefault();
                  unfollow(id);
                }}
              />
            ) : (
              <Button
                className={s.UserItem__Button}
                label={"Follow"}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  follow(id);
                }}
              />
            )}
          </div>
          <div>
            <h3 className={s.UserItem__Name}>{name}</h3>
            <p className={s.UserItem__Text}>
              {status ?? "The status will appear here very soon"}
            </p>
          </div>
        </div>
        <div className={s.UserItem__Location}>
          <p className={s.UserItem__Text}>
            {location?.country ?? "Country not specified"}
          </p>
          <p className={s.UserItem__Text}>
            {location?.city ?? "The city is not specified"}
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default UserItem;
