import { FC, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ROUTE_PATH } from "../../constants";
import IconUser from "../../assets/images/user-icon.svg";
import { ResponseMe } from "../../pages/Login/types";
import { useLogoutMutation } from "../../redux/API/auth";
import ErrorAlert from "../common/ErrorAlert/ErrorAlert";
import { useGetProfileQuery } from "../../redux/API/profile";
import { State } from "../../redux/reduxStore";
import { getAuth } from "../../redux/selectors.ts/authSelectors";
import { setAuthState } from "../../redux/slices/authSlice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";

import s from "./Header.module.scss";

type HeaderProps = Partial<ResponseMe>;

const Header: FC<HeaderProps> = (props) => {
  const dispatch = useDispatch();
  const { isAuth, login } = useSelector((state: State) => getAuth(state));
  const { data: ownerProfile } = useGetProfileQuery(Number(props.id), {
    skip: !isAuth,
  });

  const [logout] = useLogoutMutation();

  const [error, setError] = useState<
    FetchBaseQueryError | SerializedError | string | undefined
  >();

  const onLogout = useCallback(() => {
    logout()
      .unwrap()
      .then((response) => {
        dispatch(
          setAuthState({
            id: null,
            email: null,
            login: null,
            isAuth: false,
          })
        );
      })
      .catch((error) => setError(error.error));
  }, [logout, dispatch]);

  return (
    <header className={s.Header}>
      <div className={s.Header__Wrapper}>
        <Link to={ROUTE_PATH.MAIN}>
          <picture className={s.Header__DarkTheme}>
            <source
              type="image/webp"
              media="(min-width: 1440px)"
              srcSet="
              ./img/webp/logo-desktop-white@1x.webp 1x,
              ./img/webp/logo-desktop-white@2x.webp 2x
            "
            />
            <source
              type="image/webp"
              media="(min-width: 768px)"
              srcSet="
              ./img/webp/logo-tablet-white@1x.webp 1x,
              ./img/webp/logo-tablet-white@2x.webp 2x
            "
            />
            <source
              type="image/webp"
              media="(min-width: 320px)"
              srcSet="
              ./img/webp/logo-mobile-white@1x.webp 1x,
              ./img/webp/logo-mobile-white@2x.webp 2x
            "
            />
            <source
              media="(min-width: 1440px)"
              srcSet="
              ./img/content/logo-desktop-white@1x.png 1x,
              ./img/content/logo-desktop-white@2x.png 2x
            "
            />
            <source
              media="(min-width: 768px)"
              srcSet="
              ./img/content/logo-tablet-white@1x.png 1x,
              ./img/content/logo-tablet-white@2x.png 2x
            "
            />
            <img
              className={s.Header__Logo}
              src="./img/content/logo-mobile-white@1x.png"
              srcSet="./img/content/logo-mobile-white@2x.png 2x"
              loading="lazy"
              alt="Логотип"
            />
          </picture>
        </Link>
        <div className={s.Header__rightContent}>
          {isAuth ? (
            <>
              <button className={s.Header__btnLogout} onClick={onLogout}>
                Log out
              </button>
              <Link to={`${ROUTE_PATH.PROFILE}`}>
                <div className={s.Header__Login}>
                  <img
                    className={s.Header__Img}
                    src={ownerProfile?.photos.small ?? IconUser}
                    alt="Аватар пользователя"
                  />
                  <span className={s.Header__Text}>
                    {ownerProfile?.fullName || login}
                  </span>
                </div>
              </Link>
            </>
          ) : (
            <Link to={ROUTE_PATH.LOGIN}>Log in</Link>
          )}
        </div>
      </div>
      {error && (
        <ErrorAlert error={error} resetError={() => setError(undefined)} />
      )}
    </header>
  );
};

export default Header;
