export interface GetCategory {
    id: number;
    name: string;
    image: string;
    createdAt:string;
    updatedAt:string;
}

export interface CreateProduct {
    name: string;
    image: File; 
  }


