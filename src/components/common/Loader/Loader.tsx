import React, { FC } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import s from './Loader.module.scss';

interface LoaderProps {
  size?: number;
}

const Loader: FC<LoaderProps> = ({size}) => {
  return (
    <div className={s.Loader}>
      <CircularProgress color='warning' size={size || 60}/>
    </div>
  );
};

export default Loader;
