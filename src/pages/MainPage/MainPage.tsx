import React from "react";

import s from "./MainPage.module.scss";

const MainPage = () => {
  return (
    <div className={s.MainPage}>
      <div className={s.MainPage__Header}>
        <h1 className={s.MainPage__Title}>
          В путешествие с крутыми попутчиками
        </h1>
      </div>
    </div>
  );
};

export default MainPage;
