export type FavoritesType = {
  success: true;
  favorites: {
    id: number;
    title: string;
    content: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    userId: number;
  }[];
};
