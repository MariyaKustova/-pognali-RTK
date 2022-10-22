// Routes

export const ROUTE_PATH = {
  MAIN: '/',
  DIALOGS: '/dialogs',
  PROFILE: '/profile',
  NEWS: '/news',
  MUSIC: '/music',
  SETTINGS: '/settings',
  USERS: '/users',
  LOGIN: '/login',
}

export const HASH_STAR = '/*';

export const routes = [
  { to: ROUTE_PATH.PROFILE, title: "Profile" },
  { to: ROUTE_PATH.DIALOGS, title: "Dialogs" },
  { to: ROUTE_PATH.USERS, title: "Users" },
  { to: ROUTE_PATH.NEWS, title: "News" },
  { to: ROUTE_PATH.MUSIC, title: "Music" },
  { to: ROUTE_PATH.SETTINGS, title: "Settings" },
];