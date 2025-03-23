export enum ActionTypes {
  GET_MOVIES = 'get-movies',
  GET_MOVIE_DETAIL = 'get-movie-detail',
  SET_FILTER = 'set-filter',
}

export interface IMoviesState {
  getMoviesPending: boolean;
  getMovieDetailPending: boolean;
  movieSearchResult?: IMovieSearchResult;
  movieDetail: IMovieDetail;
  filter: IFilter;
}

export interface IMovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface IMovieSearchResult {
  Search: IMovieSummary[];
  totalResults: string;
  Response: string;
}

interface Rating {
  Source: string;
  Value: string;
}
export interface IMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IFilter {
  page: number;
  pageSize: number;
  searchText: string | undefined;
  year: string | undefined;
  type: 'movie' | 'series' | 'episode';
}
