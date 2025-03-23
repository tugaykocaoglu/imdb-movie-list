import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import { ActionTypes, IFilter } from './types';
import axios from 'axios';

export const getMoviesBySearch = createAsyncThunk(
  ActionTypes.GET_MOVIES,
  async (data: {
    s?: string;
    page?: number;
    y?: string;
    type?: 'movie' | 'series' | 'episode' | 'all';
  }) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com`, {
        params: {
          apiKey: `${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
          s: data?.s || undefined,
          page: data?.page || undefined,
          y: data?.y || undefined,
          type: data?.type || undefined,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const getMovieDetail = createAsyncThunk(
  ActionTypes.GET_MOVIE_DETAIL,
  async (data: { t?: string; i?: string }) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com`, {
        params: {
          apiKey: `${process.env.NEXT_PUBLIC_OMDB_API_KEY}`,
          i: data?.i,
        },
      });

      console.log('movies response', response);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const setFilter = createAction(
  ActionTypes.SET_FILTER,
  (filter: IFilter) => ({
    payload: filter,
  })
);
