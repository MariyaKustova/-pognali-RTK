import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../constants";
import { getIsAuth } from "../../redux/selectors.ts/authSelectors";
import ErrorMessage from "../../components/common/ErrorMessage/ErrorMessage";
import LoginForm from "./LoginForm/LoginForm";
import { LoginFormValues } from "./LoginForm/types";
import { useGetCaptchaUrlQuery, useLoginMutation } from "../../redux/API/auth";
import { State } from "../../redux/reduxStore";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

const Login: () => JSX.Element = () => {
  const isAuth = useSelector((state: State) => getIsAuth(state));
  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | string | undefined
  >();
  const [hint, setHint] = useState<string | undefined>();
  const [login, { data }] = useLoginMutation();
  const { data: captcha, error: captchaError } = useGetCaptchaUrlQuery(
    undefined,
    {
      skip: !(data?.resultCode === 10),
    }
  );
  useEffect(() => {
    setError(captchaError);
  }, [captchaError]);

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      login(values)
        .unwrap()
        .then((response) => {
          if (response?.resultCode === 1 || response?.resultCode === 10) {
            setHint(response.messages[0]);
          }
        })
        .catch((error) => setError(error));
    },
    [login]
  );

  if (isAuth) return <Navigate to={ROUTE_PATH.MAIN} />;

  return (
    <>
      <h1>Login</h1>
      {hint && <ErrorMessage message={hint} />}
      <LoginForm onSubmit={onSubmit} captcha={captcha} />
      {error && (
        <ErrorAlert error={error} resetError={() => setError(undefined)} />
      )}
    </>
  );
};

export default Login;
