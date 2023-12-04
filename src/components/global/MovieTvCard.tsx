import { Link } from "react-router-dom";
import { MovieProps, TVProps } from "../../../@types";
import { formatDate } from "../../../utils/formatDate";

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
      className='max-w-[20rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden sm:min-w-[20rem]'
    >
      <Link to={`/${type}/${movieOrTv.id}`}>
        <img
          src={
            movieOrTv.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movieOrTv.poster_path}`
              : "/movie-poster-placeholder.svg"
          }
          alt={(movieOrTv as MovieProps).title || (movieOrTv as TVProps).name}
          className={`h-[30rem] w-full ${
            movieOrTv.poster_path ? "object-top" : "object-center"
          } object-cover`}
        />
      </Link>
      <div className='p-2 text-base'>
        <Link to={`/${type}/${movieOrTv.id}`}>
          <h3 className='font-semibold'>
            {(movieOrTv as MovieProps).title || (movieOrTv as TVProps).name}
          </h3>
        </Link>
        <span>
          {type === "movie"
            ? formatDate((movieOrTv as MovieProps).release_date)
            : formatDate((movieOrTv as TVProps).first_air_date)}
        </span>
      </div>
    </div>
  );
};

export default MovieTvCard;
