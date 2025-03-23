'use client';

import styles from './MovieList.module.scss';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMoviesBySearch, moviesSelector, setFilter } from '@/store/movies';
import { Button, Empty, Input, Pagination, Select, Spin } from 'antd';
import MovieCard from '../MovieCard';
import { useEffect } from 'react';

const MovieList = () => {
  const {
    filter,
    movieSearchResult: { Search, totalResults },
    getMoviesPending,
  } = useAppSelector(moviesSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getMoviesBySearch({
        page: 1,
        s: filter?.searchText,
        y: filter?.year,
        type: filter?.type,
      })
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.filter}>
        <div className={styles.text}>
          <Input
            onChange={(e) => {
              dispatch(
                setFilter({
                  ...filter,
                  searchText: e.target.value,
                })
              );
            }}
            value={filter.searchText}
            placeholder='Search text'
          />
        </div>
        <div>
          <Input
            onChange={(e) => {
              dispatch(
                setFilter({
                  ...filter,
                  year: e.target.value,
                })
              );
            }}
            placeholder='Search by year'
          />
        </div>
        <div>
          <Select
            options={[
              {
                label: 'All',
                value: '',
              },
              {
                label: 'Movie',
                value: 'movie',
              },
              {
                label: 'Series',
                value: 'series',
              },
              {
                label: 'Episode',
                value: 'episode',
              },
            ]}
            onChange={(value) => {
              console.log('value', value);
              dispatch(
                setFilter({
                  ...filter,
                  type: value,
                })
              );
            }}
            value={filter?.type}
            dropdownStyle={{ width: 'fit-content' }}
            placeholder='Search type'
          />
        </div>
        <Button
          type='primary'
          onClick={async () => {
            dispatch(
              getMoviesBySearch({
                page: 1,
                s: filter?.searchText,
                y: filter?.year,
                type: filter?.type,
              })
            );
            dispatch(
              setFilter({
                ...filter,
                page: 1,
              })
            );
          }}
        >
          Search
        </Button>
      </div>

      <Spin spinning={getMoviesPending}>
        {Search?.length > 0 ? (
          <div className={styles.movieContainer}>
            {Search?.map((movie) => {
              return (
                <div className={styles.item}>
                  <MovieCard movieSummary={movie} />
                </div>
              );
            })}
          </div>
        ) : (
          <Empty />
        )}
      </Spin>
      {+totalResults > 0 && (
        <div style={{ alignSelf: 'flex-end' }}>
          <Pagination
            onChange={(page, pageSize) => {
              dispatch(
                getMoviesBySearch({
                  page: filter?.page,
                  s: filter?.searchText,
                  y: filter?.year,
                  type: filter?.type,
                })
              );
              dispatch(
                setFilter({ ...filter, page: page, pageSize: pageSize })
              );
              console.log('pageSize page', pageSize, page);
            }}
            current={filter?.page}
            total={+totalResults}
            showSizeChanger={false}
            hideOnSinglePage
          />
        </div>
      )}
    </div>
  );
};

export default MovieList;
