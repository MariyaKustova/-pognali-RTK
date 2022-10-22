export enum FieldNames {
  FULL_NAME = "fullName",
  ID = "userId",
  LOOKING_FOR_A_JOB = "lookingForAJob",
  LOOKING_FOR_A_JOB_DESCRIPTION = "lookingForAJobDescription",
  ABOUT_ME = "aboutMe",
  GITHUB = "github",
  VK = "vk",
  FACEBOOK = "facebook",
  INSTAGRAMM = "instagram",
  TWITTER = "twitter",
  WEBSITE = "website",
  YOU_TUBE = "youtube",
  MAIN_LINK = "mainLink",
  CONTACTS = "contacts",
}

export const defaultValues = {
  [FieldNames.FULL_NAME]: "",
  [FieldNames.LOOKING_FOR_A_JOB]: true,
  [FieldNames.LOOKING_FOR_A_JOB_DESCRIPTION]: "",
  [FieldNames.ABOUT_ME]: "",
  [FieldNames.CONTACTS]: {
    [FieldNames.GITHUB]: "",
    [FieldNames.VK]: "",
    [FieldNames.FACEBOOK]: "",
    [FieldNames.INSTAGRAMM]: "",
    [FieldNames.TWITTER]: "",
    [FieldNames.WEBSITE]: "",
    [FieldNames.YOU_TUBE]: "",
    [FieldNames.MAIN_LINK]: "",
  },
};

export const CONTACTS = [
  FieldNames.GITHUB,
  FieldNames.VK,
  FieldNames.FACEBOOK,
  FieldNames.INSTAGRAMM,
  FieldNames.TWITTER,
  FieldNames.WEBSITE,
  FieldNames.YOU_TUBE,
  FieldNames.MAIN_LINK,
];

export const BASE_INFO = [
  FieldNames.FULL_NAME,
  FieldNames.LOOKING_FOR_A_JOB_DESCRIPTION,
  FieldNames.ABOUT_ME,
]