import { Link } from "react-router-dom";
import { MovieProps, TVProps } from "../../../@types";
import { formatDate } from "../../../utils/formatDate";
import FavButton from "./FavButton";
import Rating from "./Rating";

const MovieTvCard = ({
  type,
  movieOrTv,
}: {
  type: string;
  movieOrTv: MovieProps | TVProps;
}) => {
  return (
    <div
      key={movieOrTv.id}
      className='relative min-w-[16.5rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden sm:min-w-[20rem]'
    >
      <Link to={`/${type}/${movieOrTv.id}`} className='relative'>
        <img
          src={
            movieOrTv.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieOrTv.poster_path}`
              : "/movie-poster-placeholder.svg"
          }
          alt={(movieOrTv as MovieProps).title || (movieOrTv as TVProps).name}
          className={`w-full ${
            movieOrTv.poster_path ? "object-top" : "object-center"
          } object-cover sm:min-h-[33rem] sm:max-h-[33rem]`}
        />
        <Rating rating={movieOrTv.vote_average} classNames='bg-white text-lg' />
      </Link>
      <div className='my-4 px-2 text-base'>
        <Link to={`/${type}/${movieOrTv.id}`}>
          <h3 className='font-semibold text-rose'>
            {(movieOrTv as MovieProps).title || (movieOrTv as TVProps).name}
            {movieOrTv.department ? (
              <span className='text-sm font-medium text-blue-100'>
                {" "}
                ({movieOrTv.department})
              </span>
            ) : (
              ""
            )}
          </h3>
        </Link>
        <span>
          {type === "movie"
            ? formatDate((movieOrTv as MovieProps).release_date)
            : formatDate((movieOrTv as TVProps).first_air_date)}
        </span>
      </div>
      <div
        className='w-fit absolute top-2 right-[0.8rem] bg-white p-[0.3rem] rounded-full opacity-30 hover:opacity-95 transition-opacity ease-in-out duration-300'
        title='Add to favorites'
      >
        <FavButton
          id={movieOrTv.id}
          type={type}
          poster_path={movieOrTv.poster_path}
          name={(movieOrTv as MovieProps).title || (movieOrTv as TVProps).name}
          rating={
            (movieOrTv as MovieProps).vote_average ||
            (movieOrTv as TVProps).vote_average
          }
          date={
            type === "movie"
              ? (movieOrTv as MovieProps).release_date
              : (movieOrTv as TVProps).first_air_date
          }
        />
      </div>
    </div>
  );
};

export default MovieTvCard;
