export interface User {
  name: string;
  id: number;
  photos: {
    small: string | null;
    large: string | null;
  };
  location?: {
    country: string | null;
    city: string | null;
  };
  status: string | null;
  followed: boolean;
}

export interface UsersResponse {
  items: User[];
  totalCount: number;
  error: string | null;
}

export type UserResp = Omit<UsersResponse, 'error'>
