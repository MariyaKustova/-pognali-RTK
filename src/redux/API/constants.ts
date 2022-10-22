const BASE_URL = "https://social-network.samuraijs.com/api/1.0/";

export const BASE_INSTANCE = {
  baseUrl: BASE_URL,
  prepareHeaders: (headers: Headers) => {
    headers.set("API-KEY", "19997782-d465-4301-8df7-198699b4772a");
    return headers;
  },
  credentials: "include" as RequestCredentials,
};

export enum REQUEST_METHOD {
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT",
}

export enum TAG_TITLE {
  USERS = "Users",
  AUTH = "Auth",
  PROFILE = "Profile",
  PROFILE_STATUS = "Profile-status",
}

export enum ENDPOINTS {
  AUTH = "auth/me",
  LOGIN = "auth/login",
  GET_USERS = "users",
  FOLLOW = "follow",
  GET_CAPTCHA = "security/get-captcha-url",
  PROFILE = "profile",
  STATUS_PROFILE = "profile/status",
  SAVE_PHOTO_PROFILE = "profile/photo",
}
