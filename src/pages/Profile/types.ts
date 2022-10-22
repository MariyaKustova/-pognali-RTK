export interface UserPhotos {
  small: string;
  large: string;
}

export interface Contacts {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
}

export interface UserProfile {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: Contacts;
  photos: UserPhotos;
}

export type ProfileFormValues = Omit<UserProfile, "userId" | "photos">;

export interface ProfileInfoFormProps extends UserProfile {
  onSubmit: (values: ProfileFormValues) => void;
  errorMessage: string | null | undefined;
}

export interface Post {
  id: string;
  message: string;
  countLikes: number;
}
