import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { routes } from "../../constants";
import FriendItem from "./FriendItem/FriendItem";
import { useGetFriendsQuery } from "../../redux/API/users";

import s from "./NavBar.module.scss";

const NavBar = () => {
  const { data: friends } = useGetFriendsQuery();

  return (
    <nav className={s.NavBar}>
      <ul>
        {routes.map((route) => (
          <li key={route.title}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.NavBar__ActiveLink : s.NavBar__Link
              }
              to={route.to}
            >
              {route.title}
            </NavLink>
          </li>
        ))}
        <li>
          <div className={s.NavBar__FriendsSection}>
            <div
              className={classnames(s.NavBar__Title, {
                [s.NavBar__TitleNotActive]: !friends?.length,
              })}
            >
              Friends online
            </div>
            {friends?.length ? (
              <div className={s.NavBar__Wrapper}>
                {friends.map((friend) => (
                  <FriendItem
                    key={friend.id}
                    id={friend.id}
                    name={friend.name}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
