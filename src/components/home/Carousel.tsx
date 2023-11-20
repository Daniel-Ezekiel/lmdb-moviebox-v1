import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieProps, TVProps } from "../../../@types";
import { Link } from "react-router-dom";

const Carousel = ({
  sectionName,
  multiType,
  queryFn,
}: {
  sectionName: string;
  multiType: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryFn: (type: string) => any;
}) => {
  const [type, setType] = useState("movie");

  const { isLoading, isError, data } = useQuery({
    queryKey: [`${sectionName}-${type}`],
    queryFn: () => queryFn(type),
  });

  const formatDate: (inputDate: string | undefined) => string = (
    inputDate: string | undefined
  ) => {
    const date = new Date(inputDate || "");
    return new Intl.DateTimeFormat("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };
  const movies: React.ReactNode[] =
    type === "movie" &&
    data?.results.map((movie: MovieProps) => (
      <div
        key={movie.id}
        className='min-w-[18rem] min-h-[32rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden'
      >
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className='min-h-[27.8rem] object-cover'
          />
        </Link>
        <div className='p-2'>
          <Link to={`/movie/${movie.id}`}>
            <h3 className='font-semibold'>{movie.title}</h3>
          </Link>
          <span>{formatDate(movie.release_date)}</span>
        </div>
      </div>
    ));

  const tv: React.ReactNode[] =
    type === "tv" &&
    data?.results.map((tv: TVProps) => (
      <div
        key={tv.id}
        className='min-w-[18rem] min-h-[32rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden'
      >
        <Link to={`/tv/${tv.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
            alt={tv.name}
            className='min-h-[27.8rem] object-cover'
          />
        </Link>
        <div className='p-2'>
          <Link to={`/tv/${tv.id}`}>
            <h3 className='font-semibold'>{tv.name}</h3>
          </Link>
          <span>{formatDate(tv.first_air_date)}</span>
        </div>
      </div>
    ));

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <section className='max-w-[124rem] mx-auto mt-5 p-3 text-base md:mt-8'>
      <div>
        <h2 className='mb-2 font-bold text-2xl capitalize xl:text-4xl'>{`${sectionName} ${
          type === "tv " ? "TV Shows" : "Movies"
        }`}</h2>

        {multiType && (
          <div className='w-fit my-2 flex bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden'>
            <button
              onClick={() => setType("movie")}
              className={`p-2 px-4 rounded-full ${
                type === "movie" && "bg-rose text-white"
              }`}
            >
              Movies
            </button>
            <button
              onClick={() => setType("tv")}
              className={`p-2 px-4 rounded-full ${
                type === "tv" && "bg-rose text-white"
              }`}
            >
              TV Shows
            </button>
          </div>
        )}
      </div>

      <div className='flex gap-3 overflow-x-scroll'>
        {isLoading
          ? Array(20)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className='min-w-[18rem] min-h-[39rem] bg-gray-200 animate-pulse rounded-xl'
                />
              ))
          : movies || tv}
      </div>
    </section>
  );
};

export default Carousel;
