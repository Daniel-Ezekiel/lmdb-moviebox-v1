import { MovieProps, TVProps } from "../../../@types";
import { formatDate } from "../../../utils/formatDate";

type GenreProps = {
  id: number;
  name: string;
};

const SummaryCard = ({
  type,
  movieOrTV,
  isLoading,
  isError,
}: {
  type: string;
  movieOrTV: MovieProps | TVProps;
  isLoading: boolean;
  isError: boolean;
}) => {
  return (
    <>
      {!isLoading && !isError && (
        <div className='relative mx-auto -mt-[8rem] pb-5 border-b-2 border-gray-200 grid justify-center items-center z-[1] md:border-b-[0] md:-mt-[15rem]'>
          <div className='p-3 pt-[0] grid justify-center items-center gap-2 text-center'>
            <div className='relative w-[18rem] h-[27rem] bg-[rgba(0,0,0,0.25)] rounded-lg place-self-center lg:w-[22rem] lg:h-[33rem]'>
              <img
                src={`https://image.tmdb.org/t/p/original/${movieOrTV?.poster_path}`}
                alt={
                  (movieOrTV as MovieProps)?.title ||
                  (movieOrTV as TVProps)?.name
                }
                className='shadow-xl rounded-2xl'
              />
              <span
                className='absolute -bottom-5 right-1/2 translate-x-1/2 w-9 h-9 place-self-center p-2 rounded-full bg-rose font-medium text-base text-gray-100'
                title='Movie Rating'
              >{`${Math.ceil(movieOrTV?.vote_average * 10)}%`}</span>
            </div>

            <div className='mt-4 px-2 max-w-[30rem]'>
              <h1 className='font-semibold text-xl text-rose leading-[1.1]'>
                {(movieOrTV as MovieProps)?.title ||
                  (movieOrTV as TVProps)?.name}
                <span>
                  {" "}
                  (
                  {(movieOrTV as MovieProps)?.release_date?.slice(0, 4) ||
                    (movieOrTV as TVProps)?.first_air_date?.slice(0, 4) ||
                    "No date"}
                  )
                </span>
              </h1>
              <span className='italic text-base'>
                {(movieOrTV as MovieProps)?.tagline}
              </span>
              <div className='mt-1 flex flex-wrap justify-center items-center gap-1 font-medium text-sm'>
                <span className='flex gap-1'>
                  {type === "movie"
                    ? formatDate((movieOrTV as MovieProps)?.release_date)
                    : formatDate((movieOrTV as TVProps)?.first_air_date)}{" "}
                  ({(movieOrTV as MovieProps | TVProps)?.status})
                </span>
                •
                <span>
                  {type === "tv"
                    ? `${(movieOrTV as TVProps).number_of_seasons} seasons (${
                        (movieOrTV as TVProps).number_of_episodes
                      } episodes)`
                    : `${Math.floor(
                        (movieOrTV as MovieProps)?.runtime / 60
                      )}h ${Math.ceil(
                        (movieOrTV as MovieProps)?.runtime % 60
                      )}mins`}{" "}
                </span>
              </div>
              <div className='mt-2'>
                {Object.values((movieOrTV as MovieProps)?.genres).map(
                  (genre: unknown) => (
                    <span
                      key={(genre as GenreProps).id}
                      className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                    >
                      {(genre as GenreProps).name}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SummaryCard;
