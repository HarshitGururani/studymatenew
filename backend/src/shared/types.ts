export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type SubjectType = {
  _id: string;
  title: string;
  backgroundUrl: string;
  text: string;
  pdf: string;
  url?: string[]; // Optional, can be empty
  channelName?: string[]; // Optional, can be empty
  videoLink?: string[]; // Optional, can be empty
};
