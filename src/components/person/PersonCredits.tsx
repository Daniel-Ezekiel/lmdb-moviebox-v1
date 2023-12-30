import { useQueries } from "@tanstack/react-query";
import {
  getPersonComboCredits,
  getPersonMovieCredits,
  getPersonTvCredits,
} from "../../../api/allFetches";
import { useParams } from "react-router-dom";
import MovieTvCard from "../global/MovieTvCard";
import { MovieProps, TVProps } from "../../../@types";

const PersonCredits = ({
  knownFor,
  personId,
}: {
  knownFor: string;
  personId: number;
}) => {
  const { id } = useParams();

  const [movieCredits, tvCredits, comboCredits] = useQueries({
    queries: [
      {
        queryKey: [`${id}-movie-credits`],
        queryFn: () => getPersonMovieCredits(personId),
        // staleTime: Infinity,
      },
      {
        queryKey: [`${id}-tv-credits`],
        queryFn: () => getPersonTvCredits(personId),
        // staleTime: Infinity,
      },
      {
        queryKey: [`${id}-combo-credits`],
        queryFn: () => getPersonComboCredits(personId),
        // staleTime: Infinity,
      },
    ],
  });
  // console.log(movieCredits?.data, tvCredits, comboCredits);

  return (
    <>
      {knownFor === "Acting" && (
        <section className='mt-4'>
          {!movieCredits.isLoading &&
            !movieCredits.isError &&
            movieCredits.data.cast.length > 0 && (
              <div>
                <h2 className='my-2 mt-6 font-semibold text-2xl text-rose'>
                  Movie Credits{" "}
                  <span className='text-blue-100'>
                    ({movieCredits.data.cast.length})
                  </span>
                </h2>
                <div className='flex gap-3 overflow-x-scroll'>
                  {movieCredits.data.cast.map((movieOrTv: MovieProps) => (
                    <MovieTvCard
                      key={movieOrTv.id}
                      type='movie'
                      movieOrTv={movieOrTv}
                    />
                  ))}
                </div>
              </div>
            )}

          {!tvCredits.isLoading &&
            !tvCredits.isError &&
            tvCredits.data.cast.length > 0 && (
              <div>
                <h2 className='my-2 mt-6 font-semibold text-2xl text-rose'>
                  TV Credits{" "}
                  <span className='text-blue-100'>
                    ({tvCredits.data.cast.length})
                  </span>
                </h2>
                <div className='flex gap-3 overflow-x-scroll'>
                  {tvCredits.data.cast.map((movieOrTv: TVProps) => (
                    <MovieTvCard
                      key={movieOrTv.id}
                      type='tv'
                      movieOrTv={movieOrTv}
                    />
                  ))}
                </div>
              </div>
            )}

          {!comboCredits.isLoading &&
            !comboCredits.isError &&
            comboCredits.data.crew.length > 0 && (
              <div>
                <h2 className='my-2 mt-6 font-semibold text-2xl text-rose'>
                  Non-acting Credits{" "}
                  <span className='text-blue-100'>
                    ({comboCredits.data.crew.length})
                  </span>
                </h2>
                <div className='flex gap-3 overflow-x-scroll'>
                  {comboCredits.data.crew.map(
                    (movieOrTv: MovieProps | TVProps) => (
                      <MovieTvCard
                        key={movieOrTv.id}
                        type={movieOrTv?.media_type}
                        movieOrTv={movieOrTv}
                      />
                    )
                  )}
                </div>
              </div>
            )}
        </section>
      )}

      {knownFor !== "Acting" && (
        <section className='mt-4'>
          {!comboCredits.isLoading &&
            !comboCredits.isError &&
            comboCredits.data.crew.length > 0 && (
              <div>
                <h2 className='my-2 mt-6 font-semibold text-2xl text-rose'>
                  {knownFor} and other Non-acting Credits{" "}
                  <span className='text-blue-100'>
                    ({comboCredits.data.crew.length})
                  </span>
                </h2>
                <div className='flex gap-3 overflow-x-scroll'>
                  {comboCredits.data.crew.map(
                    (movieOrTv: MovieProps | TVProps) => (
                      <MovieTvCard
                        key={movieOrTv.id}
                        type={movieOrTv?.media_type}
                        movieOrTv={movieOrTv}
                      />
                    )
                  )}
                </div>
              </div>
            )}

          {!movieCredits.isLoading &&
            !movieCredits.isError &&
            movieCredits.data.cast.length > 0 && (
              <div>
                <h2 className='my-2 mt-6 font-semibold text-2xl text-rose'>
                  Movie Credits{" "}
                  <span className='text-blue-100'>
                    ({movieCredits.data.cast.length})
                  </span>
                </h2>
                <div className='flex gap-3 overflow-x-scroll'>
                  {movieCredits.data.cast.map((movieOrTv: MovieProps) => (
                    <MovieTvCard
                      key={movieOrTv.id}
                      type='movie'
                      movieOrTv={movieOrTv}
                    />
                  ))}
                </div>
              </div>
            )}

          {!tvCredits.isLoading &&
            !tvCredits.isError &&
            tvCredits.data.cast.length > 0 && (
              <div>
                <h2 className='my-2 mt-6 font-semibold text-2xl text-rose'>
                  TV Credits{" "}
                  <span className='text-blue-100'>
                    ({tvCredits.data.cast.length})
                  </span>
                </h2>
                <div className='flex gap-3 overflow-x-scroll'>
                  {tvCredits.data.cast.map((movieOrTv: TVProps) => (
                    <MovieTvCard
                      key={movieOrTv.id}
                      type='tv'
                      movieOrTv={movieOrTv}
                    />
                  ))}
                </div>
              </div>
            )}
        </section>
      )}
    </>
  );
};

export default PersonCredits;
