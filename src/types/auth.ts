export type FormData = {
  email: string;
  password: string;
};

export type FetchUser = {
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};
