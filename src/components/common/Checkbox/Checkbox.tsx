import React, { ForwardedRef } from "react";
import classnames from "classnames";

import { capitalizeFirstLetter } from "../../../utils";

import s from "./Checkbox.module.scss";


interface CheckboxProps {
  name?: string;
  value: boolean;
  className?: string;
  onBlur?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = React.forwardRef((props: CheckboxProps, ref: ForwardedRef<HTMLInputElement> ) => {
  const {
    name,
    value,
    className,
    onBlur,
    onChange,
  } = props;

  return (
      <label className={s.Checkbox}>
        {name && <div className={s.Checkbox__label}>{capitalizeFirstLetter(name)}</div>}        
        <input
          autoFocus
          type="checkbox"
          checked={value}
          onBlur={onBlur}
          onChange={onChange}
          className={classnames(s.Checkbox__input, className)}
          ref={ref}
        />
        <span className={s.Checkbox__control}></span>
      </label>
  );
});

export default Checkbox;
