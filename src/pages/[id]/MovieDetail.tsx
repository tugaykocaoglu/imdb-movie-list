import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMovieDetail, moviesSelector } from '@/store/movies';
import { Col, Rate, Row, Spin, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import styles from './MovieDetail.module.scss';

const MovieDetail = () => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { movieDetail } = useAppSelector(moviesSelector);

  const router = useRouter();
  const id = router?.query?.id as string;

  const initialFetch = async () => {
    try {
      await dispatch(getMovieDetail({ i: id })).unwrap();
    } catch (err) {
      console.log('error', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    initialFetch();
  }, [id]);

  return (
    <div className={styles.movieDetail}>
      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[48, 0]}>
          <Col span={12}>
            <div className={styles.poster}>
              <img
                src={
                  movieDetail?.Poster !== 'N/A'
                    ? movieDetail?.Poster
                    : '/noImage.png'
                }
              />
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.infoList}>
              <div className={styles.header}>
                <div className={styles.title}>
                  {movieDetail?.Title} ({movieDetail?.Year})
                </div>
                <div className={styles.subTitle}>
                  {movieDetail?.Type.toUpperCase()}
                </div>
                <div className={styles.description}>{movieDetail?.Plot}</div>
                <div>
                  {movieDetail?.Genre?.split(', ')?.map((genre) => (
                    <Tag key={genre} color='blue'>
                      {genre}
                    </Tag>
                  ))}
                </div>
                <div className={styles.rate}>
                  <Rate
                    style={{ fontSize: '48px' }}
                    value={+movieDetail?.imdbRating}
                    disabled
                    count={1}
                  />
                  <span style={{ fontSize: '32px' }}>
                    {movieDetail?.imdbRating}
                  </span>
                </div>
              </div>

              <ul style={{ paddingInlineStart: '24px' }}>
                {movieDetail &&
                  Object.entries(movieDetail)?.map((detail) => {
                    if (
                      ![
                        'Response',
                        'Title',
                        'Plot',
                        'Genre',
                        'Poster',
                        'imdbID',
                        'Ratings',
                        'DVD',
                        'Production',
                        'Website',
                        'Type',
                        'Year',
                      ]?.includes(detail?.[0])
                    )
                      return (
                        <li key={detail?.[0]} style={{ marginBottom: '16px' }}>
                          {detail?.[0]}: {JSON.stringify(detail?.[1])}
                        </li>
                      );
                  })}
              </ul>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default MovieDetail;
