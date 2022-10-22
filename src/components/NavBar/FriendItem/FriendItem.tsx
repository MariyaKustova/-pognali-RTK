import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { ROUTE_PATH } from "../../../constants";

import s from "./FriendItem.module.scss";

interface FriendItemProps {
  id: number;
  name: string;
}

const FriendItem: FC<FriendItemProps> = ({ id, name }) => {
  return (
    <NavLink className={s.FriendItem} to={`${ROUTE_PATH.PROFILE}/${id}`}>
        <span className={s.FriendItem__name}>{name}</span>
    </NavLink>
  );
};

export default FriendItem;
