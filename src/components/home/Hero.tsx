import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../../../api/allFetches";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowForwardIos, PlayCircle } from "@mui/icons-material";
import Header from "../global/Header";
import { MovieProps } from "../../../@types";

const Hero = () => {
  const [currMoviePos, setCurrMoviePos] = useState<number>(4);

  const { isLoading, isError, data } = useQuery({
    queryKey: ["now-playing"],
    queryFn: getNowPlaying,
  });

  const movie: MovieProps = data?.results.slice(0, 5)[currMoviePos];
  // console.log(movie);

  function changeMovie() {
    currMoviePos > 3
      ? setCurrMoviePos(0)
      : setCurrMoviePos((prevPos) => prevPos + 1);
  }

  // if (isError) {
  //   return (
  //     <div className='max-w-[124rem] mx-auto p-3'>
  //       Error! Could not fetch movies
  //     </div>
  //   );
  // }

  return (
    <>
      {isError && (
        <section className='h-[75vh] bg-gray-100'>
          <Header activePage='home' />
          <div className='max-w-[124rem] mx-auto flex justify-center items-center text-blue-500 text-lg w-full p-3 z-[1] xl:px-3'>
            <h4>Could not retrieve movies.</h4>
          </div>
        </section>
      )}

      {isLoading && (
        <section className='h-[75vh] bg-blue-100 animate-pulse'>
          <Header activePage='home' />
        </section>
      )}

      {!isLoading && !isError && (
        <section
          style={{
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
          }}
          className='relative h-[75vh] bg-[50%_10%] bg-cover bg-no-repeat grid text-base text-gray-100'
        >
          <div className='absolute top-[0] left-[0] h-full w-full bg-[rgba(17,24,39,0.5)]'></div>
          <Header activePage='home' />
          <div className='max-w-[124rem] mx-auto flex items-center w-full p-3 z-[1] xl:px-3'>
            <div className='max-w-[50rem] grid grid-cols-2 gap-2'>
              <h1 className='col-span-full font-bold text-3xl xl:text-5xl'>
                {movie.title}
              </h1>

              <span className='col-span-2 flex items-center gap-1'>
                Rating: {(movie.vote_average * 10).toPrecision(2)}%
              </span>

              <p className='col-span-full my-2'>{movie.overview}</p>

              <Link
                to={`/movie/${movie.id}`}
                className='flex gap-1 justify-center items-center p-2 bg-rose text-white rounded-xl'
              >
                <PlayCircle fontSize='large' sx={{ color: "#fff" }} />
                Watch Trailer
              </Link>

              <button
                className='flex gap-1 justify-center items-center p-2 bg-rose text-white rounded-xl'
                type='button'
                onClick={changeMovie}
              >
                Show next Movie
                <ArrowForwardIos />
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero;
