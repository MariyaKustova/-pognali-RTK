import React, { FC } from "react";

import s from "./SmartImgLink.module.scss";

interface SmartLinkProps {
  url?: string;
  title?: string;
  src?: string;
  alt? :string;
}

const SmartLink: FC<SmartLinkProps> = ({url, title, src, alt}) => {
  return url ? (
    <a
      className={s.SmartImgLink}
      href={url}
      title={title}
      target="_blank"
      rel="noreferrer"
    >
      <img className={s.SmartImgLink__Img} src={src} alt={alt} />
    </a>
  ) : null;
};

export default SmartLink;
