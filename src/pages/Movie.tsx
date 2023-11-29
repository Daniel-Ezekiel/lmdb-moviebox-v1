// import { MovieDetailsProps } from "../../@types";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getMovieOrTvDetails } from "../../api/allFetches";
import Carousel from "../components/movie-tv/Carousel";
import Trailer from "../components/movie-tv/Trailer";
import { ArrowForwardIos } from "@mui/icons-material";
import Recommendations from "../components/movie-tv/Recommendations";
import SummaryCard from "../components/movie-tv/SummaryCard";
// import { MovieDetailsProps } from "../../@types";

const Movie = () => {
  const { id } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: [`movie-${id}`],
    queryFn: () => getMovieOrTvDetails("movie", id as string),
  });

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
              <SummaryCard type='movie' movieOrTV={data} />

              <div className='mx-auto p-3 flex flex-col gap-4 md:max-w-[70%]'>
                <div>
                  <h2 className='mb-2 font-semibold text-xl text-rose lg:text-2xl'>
                    Overview
                  </h2>
                  <p className='text-base'>{data?.overview}</p>
                </div>

                <div>
                  <h2 className='flex justify-between items-end mb-2 font-semibold text-xl text-rose lg:text-2xl'>
                    Main Cast
                    <Link
                      to='./cast-and-crew'
                      className='ml-auto text-base hover:underline'
                    >
                      See full cast and crew <ArrowForwardIos />
                    </Link>
                  </h2>

                  <Carousel movieID={data?.id} type='movie' />
                </div>
              </div>
            </section>

            <section className='mt-6 border-t-2 border-gray-200 p-3'>
              <h2 className='pt-4 font-semibold text-xl text-rose'>
                Watch trailer
              </h2>

              <Trailer title={data?.title.toLowerCase().split(" ").join("-")} />
            </section>

            <section className='mt-6 border-t-2 border-gray-200 p-3'>
              <Recommendations id={data?.id} type='movie' />
            </section>
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default Movie;
