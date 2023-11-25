// import { MovieDetailsProps } from "../../@types";
import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "../../api/allFetches";
import Carousel from "../components/movie/Carousel";
// import { MovieDetailsProps } from "../../@types";

type GenreProps = {
  id: number;
  name: string;
};

const Movie = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: [`movie-${id}`],
    queryFn: () => getMovieDetails(id as string),
  });

  console.log(id, data);

  const formatDate: (inputDate: string) => string = (inputDate: string) => {
    const date = new Date(inputDate || "");
    return new Intl.DateTimeFormat("default", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <MainLayout showHeader={true} activePage='movie' showFooter={true}>
      {!isLoading && !isError && (
        <>
          <div
            style={{
              backgroundImage: `url('https://image.tmdb.org/t/p/original/${data?.backdrop_path}')`,
            }}
            className='col-span-full relative h-[22rem] bg-cover no-repeat bg-center shadow-lg after:absolute after:bg-[rgba(0,0,0,0.45)] after:h-full after:w-full after:top-0 after:left-0 md:h-[28rem] lg:h-[32rem] xl:h-[40rem]'
          ></div>

          <div className='xl:max-w-[124rem] mx-auto md:grid-cols-[auto,_1fr] md:gap-3'>
            <section className='md:flex'>
              <div className='relative mx-auto -mt-[8rem] pb-5 border-b-2 border-gray-200 grid justify-center items-center z-[1] md:border-b-[0] md:-mt-[15rem]'>
                <div className='p-3 pt-[0] grid justify-center items-center gap-2 text-center'>
                  <div className='relative w-[18rem] place-self-center lg:w-[22rem]'>
                    <img
                      src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                      alt={data?.title}
                      className='shadow-xl rounded-2xl'
                    />
                    <span
                      className='absolute -bottom-5 right-1/2 translate-x-1/2 w-9 h-9 place-self-center p-2 rounded-full bg-rose font-medium text-base text-gray-100'
                      title='Movie Rating'
                    >{`${Math.ceil(data?.vote_average * 10)}%`}</span>
                  </div>

                  <div className='mt-4 px-2 max-w-[30rem]'>
                    <h1 className='font-semibold text-xl text-rose leading-[1.1]'>
                      {data?.title}
                      <span> ({data?.release_date.slice(0, 4)})</span>
                    </h1>
                    <span className='italic text-base'>{data?.tagline}</span>
                    <div className='mt-1 flex justify-center items-center gap-1 font-medium text-sm'>
                      <span className='flex gap-1'>
                        {formatDate(data?.release_date)} ({data?.status})
                      </span>
                      •
                      <span>
                        {`${Math.floor(data?.runtime / 60)}h ${Math.ceil(
                          data?.runtime % 60
                        )}mins`}{" "}
                      </span>
                    </div>
                    <div className='mt-2'>
                      {Object.values(data?.genres).map((genre: unknown) => (
                        <span
                          key={(genre as GenreProps).id}
                          className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
                        >
                          {(genre as GenreProps).name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className='mx-auto p-3 flex flex-col gap-4 md:max-w-[70%]'>
                <div>
                  <h2 className='mb-2 font-semibold text-xl text-rose lg:text-2xl'>
                    Overview
                  </h2>
                  <p className='text-base'>{data?.overview}</p>
                </div>

                <div>
                  <h2 className='mb-2 font-semibold text-xl text-rose lg:text-2xl'>
                    Main Cast
                  </h2>
                  <Carousel movieID={data?.id} category='cast' />
                </div>
              </div>
            </section>

            <section>
              <h2>Watch trailer</h2>
            </section>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Movie;
