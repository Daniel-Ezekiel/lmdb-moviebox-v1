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
        <CastMemberCard castMember={castMember} />
      ));

  return (
    <div className='flex gap-3 overflow-scroll'>
      {!isLoading && !isError && profilesToShow}
    </div>
  );
};

export default Carousel;
