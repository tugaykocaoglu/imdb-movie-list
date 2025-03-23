import { RootState } from '@/store';
import { createSelector } from '@reduxjs/toolkit';

export const selectMovies = (state: RootState) => state.movies;

export const moviesSelector = createSelector(selectMovies, (state) => state);
