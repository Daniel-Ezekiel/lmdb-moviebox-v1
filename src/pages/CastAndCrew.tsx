import { useQueries } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMovieOrTvCredits, getMovieOrTvDetails } from "../../api/allFetches";
import { CastMemberProps } from "../../@types";
import CastMemberCard from "../components/global/CastMemberCard";
import MainLayout from "../layout/MainLayout";

const CastAndCrew = ({ type }: { type: string }) => {
  const { id } = useParams();

  const [info, castAndCrew] = useQueries({
    queries: [
      {
        queryKey: [`${type}-details-${id}`],
        queryFn: () => getMovieOrTvDetails(type, id as string),
        // staleTime: Infinity,
      },
      {
        queryKey: [`${type}-credits-${id}`],
        queryFn: () => getMovieOrTvCredits(type, id as string),
        // staleTime: Infinity,
      },
    ],
  });

  return (
    <MainLayout activePage='cast-and-crew' showHeader={true} showFooter={true}>
      {
        <div className='p-3'>
          {!info.isLoading && !info.isError && (
            <h1 className='max-w-[124rem] mx-auto pt-10 text-3xl font-bold xl:text-5xl'>
              Cast and Crew for{" "}
              <span className='text-rose'>
                {info.data.name || info.data.title}
              </span>
            </h1>
          )}
          {!castAndCrew.isLoading && !castAndCrew.isError && (
            <>
              <section className='max-w-[124rem] mx-auto mt-10'>
                <h2 className='mb-3 font-semibold text-2xl text-rose'>Cast</h2>
                <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-7 lg:grid-cols-5 xl:grid-cols-6'>
                  {!castAndCrew.data.cast.length && (
                    <p className='text-base'>No information to display</p>
                  )}
                  {castAndCrew.data.cast.map((cast: CastMemberProps) => (
                    <CastMemberCard key={cast.id} castMember={cast} />
                  ))}
                </div>
              </section>

              <section className='max-w-[124rem] mx-auto mt-10'>
                <h2 className='mb-3 font-semibold text-2xl text-rose'>Crew</h2>
                <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:gap-7 lg:grid-cols-5 xl:grid-cols-6'>
                  {!castAndCrew.data.crew.length && (
                    <p className='text-base'>No information to display</p>
                  )}
                  {castAndCrew.data.crew.map((crew: CastMemberProps) => (
                    <CastMemberCard key={crew.id} castMember={crew} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      }
    </MainLayout>
  );
};

export default CastAndCrew;
