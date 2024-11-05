export interface GetCategory {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategory {
  name: string;
  image: File;
}
