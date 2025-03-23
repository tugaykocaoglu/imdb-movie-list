import { createReducer } from '@reduxjs/toolkit';
import { getMovieDetail, getMoviesBySearch, setFilter } from './actions';
import { IMoviesState } from './types';

const initialState: IMoviesState = {
  getMoviesPending: false,
  getMovieDetailPending: false,
  movieDetail: undefined,
  movieSearchResult: {
    Search: [],
    Response: 'true',
    totalResults: '0',
  },
  filter: {
    page: 1,
    pageSize: 10,
    searchText: 'Pokemon',
    year: undefined,
    type: 'movie',
  },
};

export const moviesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getMoviesBySearch.fulfilled, (state, { payload }) => {
      state.movieSearchResult = payload;
      state.getMoviesPending = false;
    })
    .addCase(getMoviesBySearch.pending, (state) => {
      state.getMoviesPending = true;
    })
    .addCase(getMoviesBySearch.rejected, (state) => {
      state.getMoviesPending = false;
      state.movieSearchResult = initialState.movieSearchResult;
    })
    .addCase(getMovieDetail.fulfilled, (state, { payload }) => {
      state.movieDetail = payload;
      state.getMovieDetailPending = false;
    })
    .addCase(getMovieDetail.pending, (state) => {
      state.getMovieDetailPending = true;
    })
    .addCase(getMovieDetail.rejected, (state) => {
      state.getMovieDetailPending = false;
      state.movieDetail = initialState.movieDetail;
    })
    .addCase(setFilter, (state, { payload }) => {
      state.filter = payload;
    });
});

export default moviesReducer;
