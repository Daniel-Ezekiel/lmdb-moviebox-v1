import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { MovieProps, TVProps } from "../../../@types";
// import MovieCard from "../global/MovieCard";
// import TVCard from "../global/TVCard";
import SkeletonCard from "../global/SkeletonCard";
import MovieTvCard from "../global/MovieTvCard";

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

  // const movies: React.ReactNode[] =
  //   type === "movie" &&
  //   data?.results.map((movie: MovieProps) => (
  //     <MovieCard key={movie.id} movie={movie} />
  //   ));

  // const tv: React.ReactNode[] =
  //   type === "tv" &&
  //   data?.results.map((tv: TVProps) => <TVCard key={tv.id} tv={tv} />);

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

      <div>
        {isError && (
          <div>Could not retrieve {type === "tv" ? "TV Shows" : "Movies"}.</div>
        )}
      </div>

      <div className='flex gap-3 overflow-x-scroll'>
        {isLoading
          ? Array(20)
              .fill("")
              .map((_, i) => <SkeletonCard key={i} />)
          : data?.results.map((movieOrTv: MovieProps | TVProps) => (
              <MovieTvCard
                type={type}
                key={movieOrTv.id}
                movieOrTv={movieOrTv}
              />
            ))}
      </div>
    </section>
  );
};

export default Carousel;
