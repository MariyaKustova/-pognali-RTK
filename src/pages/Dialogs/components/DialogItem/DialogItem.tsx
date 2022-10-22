import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTE_PATH } from "../../../../constants";

import s from "./DialogItem.module.scss";

interface DialogItemProps {
  path: string;
  content: string;
}

const DialogItem: FC<DialogItemProps> = ({ path, content }) => {
  return (
    <li className={s.DialogItem__Dialog}>
      <NavLink
        className={({ isActive }) =>
          isActive ? s.DialogItem__LinkActive : s.DialogItem__Link
        }
        to={`${ROUTE_PATH.DIALOGS}/${path}`}
      >
        <picture>
          <source
            type="image/webp"
            media="(min-width: 1440px)"
            srcSet="
    ./img/webp/rogovaya-desktop@1x.webp 1x,
    ./img/webp/rogovaya-desktop@2x.webp 2x
  "
          />
          <source
            type="image/webp"
            media="(min-width: 768px)"
            srcSet="
    ./img/webp/rogovaya-desktop@1x.webp 1x,
    ./img/webp/rogovaya-desktop@2x.webp 2x
  "
          />
          <source
            type="image/webp"
            media="(min-width: 320px)"
            srcSet="
    ./img/webp/rogovaya-desktop@1x.webp 1x,
    ./img/webp/rogovaya-desktop@2x.webp 2x
  "
          />
          <source
            media="(min-width: 1440px)"
            srcSet="
    ./img/content/rogovaya-desktop@1x.jpg 1x,
    ./img/content/rogovaya-desktop@2x.jpg 2x
  "
          />
          <source
            media="(min-width: 768px)"
            srcSet="
    ./img/content/rogovaya-desktop@1x.jpg 1x,
    ./img/content/rogovaya-desktop@2x.jpg 2x
  "
          />
          <img
            className={s.DialogItem__Img}
            src="./img/content/rogovaya-mobile@1x.jpg"
            srcSet="./img/content/rogovaya-mobile@2x.jpg 2x"
            alt="Ларисы Роговой"
          />
        </picture>
        {content}
      </NavLink>
    </li>
  );
};

export default DialogItem;
