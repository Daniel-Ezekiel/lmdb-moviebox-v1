import { useQuery } from "@tanstack/react-query";
import { getTrailerVideo } from "../../../api/allFetches";

const Trailer = ({ title }: { title: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`movie-trailer-${title}`],
    queryFn: () => getTrailerVideo(title),
  });

  const trailerId: string = !isLoading && !isError && data.items[0].id.videoId;
  console.log(!isLoading && data.items[0].id.videoId);

  return (
    <div className='h-[22rem] md:h-[40rem] xl:h-[50rem]'>
      {!isLoading && (
        <iframe
          className='w-full h-full mt-2 rounded-lg'
          src={`https://www.youtube.com/embed/${trailerId}`}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Trailer;
