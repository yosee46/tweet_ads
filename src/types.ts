export interface Ad {
  id: string;
  image: string;
  title: string;
  details: string;
  genre: string;
}

export interface AdsByGenre {
  [genre: string]: Ad[];
}