import React from "react";

import s from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={s.NotFound}>
      <h1 className={s.NotFound__Title}>К сожалению, страница не найдена!</h1>
    </div>
  );
};

export default NotFound;
