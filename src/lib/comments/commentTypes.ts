export type CommentType = {
  id: number | string;
  message: string;
  createdAt: Date;
  user: {
    id: number;
    username: string;
  };
};
