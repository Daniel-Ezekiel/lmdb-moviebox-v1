import { useQuery } from "@tanstack/react-query";
import { getMovieOrTvCredits } from "../../../api/allFetches";
import { CastMemberProps } from "../../../@types";
import CastMemberCard from "../global/CastMemberCard";

const Carousel = ({
  movieID,
  type,
  category,
}: {
  movieID: string;
  type: string;
  category: string;
}) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`movie-credits-${type}-${movieID}`],
    queryFn: () => getMovieOrTvCredits(type, movieID),
  });

  console.log(!isLoading && !isError && data["cast"], data, category);

  const profilesToShow: React.ReactNode[] =
    !isLoading &&
    !isError &&
    data.cast
      .slice(0, 10)
      .map((castMember: CastMemberProps) => (
        <CastMemberCard castMember={castMember} />
      ));

  console.log(profilesToShow);

  return (
    <div className='flex gap-3 overflow-scroll'>
      {!isLoading && !isError && profilesToShow}
    </div>
  );
};

export default Carousel;
