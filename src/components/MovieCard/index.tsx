'use client';
import styles from './MovieCard.module.scss';

import { IMovieSummary } from '@/store/movies';

import Link from 'next/link';

interface MovieCardProps {
  movieSummary: IMovieSummary;
}
const MovieCard: React.FC<MovieCardProps> = ({ movieSummary }) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.info}>
        <div className={styles.poster}>
          <img
            src={
              movieSummary.Poster !== 'N/A'
                ? movieSummary?.Poster
                : '/noImage.png'
            }
          />
        </div>
        <Link className={styles.title} href={`/${movieSummary.imdbID}`}>
          {movieSummary?.Title}
        </Link>

        <div className={styles.info}>
          <div>
            <label>Year</label>:{' '}
            <span className={styles.value}>{movieSummary?.Year}</span>
          </div>
          <div>
            <label>Type</label>:{' '}
            <span className={styles.value}>
              {movieSummary?.Type.toUpperCase()}
            </span>
          </div>
          <div>
            <label>IMDB ID</label>:{' '}
            <span className={styles.value}>{movieSummary?.imdbID}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
