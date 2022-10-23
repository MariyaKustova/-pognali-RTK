import { LoginFormValues } from "./../Login/LoginForm/types";
import { get } from "lodash";

import IconFB from "../../assets/images/fb-icon.svg";
import IconGithub from "../../assets/images/github-icon.svg";
import IconInstagram from "../../assets/images/instagram-icon.svg";
import IconMainLink from "../../assets/images/mainlink-icon.svg";
import IconTwitter from "../../assets/images/twitter-icon.svg";
import IconVK from "../../assets/images/vk-icon.svg";
import IconWebsite from "../../assets/images/web-icon.svg";
import IconYoutube from "../../assets/images/youtube-icon.svg";
import { Contacts, ProfileFormValues } from "./types";
import { capitalizeFirstLetter } from "../../utils";

export const getIcon = (key: string) => {
  switch (key) {
    case "facebook":
      return IconFB;
    case "github":
      return IconGithub;
    case "instagram":
      return IconInstagram;
    case "mainLink":
      return IconMainLink;
    case "twitter":
      return IconTwitter;
    case "vk":
      return IconVK;
    case "website":
      return IconWebsite;
    case "youtube":
      return IconYoutube;
    default:
      return "";
  }
};

export const checkRequired = (
  values: ProfileFormValues | LoginFormValues,
  errors: Record<string, string>,
  code: string
) => {
  const parameterName = get(values, code);
  if (
    !parameterName ||
    (typeof parameterName === "string" && !parameterName.trim().length)
  ) {
    errors[code] = `${capitalizeFirstLetter(code)} is a required field`;
  }
};

const isValidEmail = (fieldValue: string) => {
  return (
    fieldValue &&
    typeof fieldValue === "string" &&
    !String(fieldValue)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  );
};

export const checkEmail = (
  values: LoginFormValues | Contacts,
  errors: Record<string, string>,
  code: string
) => {
  const fieldValue = get(values, code);
  if (isValidEmail(fieldValue)) {
    errors[code] = `${capitalizeFirstLetter(code)} must be a valid email`;
  }
};

export const checkCorrectEmail = (
  values: Contacts,
  errors: { contacts?: Record<string, string> },
  code: string
) => {
  const fieldValue = get(values, code);
  const contacts: Record<string, string> = {};

  if (isValidEmail(fieldValue)) {
    contacts[code] = `${capitalizeFirstLetter(code)} must be a valid email`;
    errors.contacts = contacts;
  }
};
