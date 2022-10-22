import React, { FC } from "react";

import s from "./PostItem.module.scss";

interface PostItemProps {
  message: string;
  countLikes: number;
}

const PostItem: FC<PostItemProps> = ({ message, countLikes }) => {
  return (
    <li className={s.Post}>
      <picture>
        <source
          type="image/webp"
          media="(min-width: 1440px)"
          srcSet="
                ./img/webP/firsova-desktop@1x.webp 1x,
                ./img/webP/firsova-desktop@2x.webp 2x
              "
        />
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet="
                ./img/webP/firsova-desktop@1x.webp 1x,
                ./img/webP/firsova-desktop@2x.webp 2x
              "
        />
        <source
          type="image/webp"
          media="(min-width: 320px)"
          srcSet="
                ./img/webP/firsova-desktop@1x.webp 1x,
                ./img/webP/firsova-desktop@2x.webp 2x
              "
        />
        <source
          media="(min-width: 1440px)"
          srcSet="
                ./img/content/firsova-desktop@1x.jpg 1x,
                ./img/content/firsova-desktop@2x.jpg 2x
              "
        />
        <source
          media="(min-width: 768px)"
          srcSet="
                ./img/content/firsova-desktop@1x.jpg 1x,
                ./img/content/firsova-desktop@2x.jpg 2x
              "
        />
        <img
          className={s.Post__Img}
          src="./img/content/firsova-mobile@1x.jpg"
          srcSet="./img/content/firsova-mobile@2x.jpg 2x"
          alt="Фотография Татьяны Фирсовой"
        />
      </picture>
      <span>{message}</span>
      <div>like: {countLikes}</div>
    </li>
  );
};

export default PostItem;
