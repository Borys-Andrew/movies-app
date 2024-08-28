export interface Movie {
  _id: string;
  title: string;
  image: string;
  director: string;
  actors: string[];
  genre: string[];
  rating: number;
  releaseDate: string;
  description: string;
  isFavorite?: boolean;
  __v?: number;
}
export interface NewMovie {
  title: string;
  image: string;
  director: string;
  actors: string[];
  genre: string[];
  rating: number;
  releaseDate: string;
  description: string;
}

export interface MovieItem {
  id: string;
  title: string;
  image: string;
  rating: number;
  releaseDate: string;
}

export interface User {
  userName: string;
  email: string;
  password: string;
  favorites: string[];
}
