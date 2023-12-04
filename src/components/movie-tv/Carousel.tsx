import { useQuery } from "@tanstack/react-query";
import { getMovieOrTvCredits } from "../../../api/allFetches";
import { CastMemberProps } from "../../../@types";
import CastMemberCard from "../global/CastMemberCard";

const Carousel = ({ movieID, type }: { movieID: string; type: string }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`movie-credits-${type}-${movieID}`],
    queryFn: () => getMovieOrTvCredits(type, movieID),
  });

  const profilesToShow: React.ReactNode[] =
    !isLoading &&
    !isError &&
    data.cast
      .slice(0, 10)
      .map((castMember: CastMemberProps) => (
        <CastMemberCard key={castMember.id} castMember={castMember} />
      ));

  return (
    <div className='flex gap-3 overflow-x-auto'>
      {isLoading &&
        !isError &&
        Array(20)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className='min-w-[15rem] h-[29rem] shadow-lg rounded-xl border border-gray-200 overflow-hidden'
            ></div>
          ))}
      {!isLoading && !isError && !data.cast.length && (
        <p className='text-base'>No information to display</p>
      )}
      {!isLoading && !isError && profilesToShow}
    </div>
  );
};

export default Carousel;
