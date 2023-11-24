import { TVProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getByURL } from "../../api/allFetches";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import TVCard from "../components/global/TVCard";
import SkeletonCard from "../components/global/SkeletonCard";

const Movies = () => {
  const { category } = useParams();

  const { isLoading, isError, data } = useQuery({
    queryKey: [`tv-${category}`],
    queryFn: () => getByURL("tv", category?.split("-").join("_")),
  });

  const tvShows: React.ReactNode[] = data?.results.map((tv: TVProps) => (
    <TVCard key={tv.id} tv={tv} />
  ));

  return (
    <MainLayout showHeader={true} activePage='movies' showFooter={true}>
      <section className='max-w-[124rem] mx-auto p-3 grid grid-cols-2 justify-between items-center gap-4 md:pt-[5rem]'>
        <h1 className='flex gap-2 font-semibold text-4xl'>
          TV Shows{" "}
          <span className='font-normal text-sm text-rose'>
            {category?.split("-").join(" ")}
          </span>
        </h1>
      </section>

      <section className='max-w-[124rem] mx-auto p-3 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
        {isError && (
          <div className='col-span-full max-w-[124rem] mx-auto p-3'>
            Error! Could not fetch {category?.split("-").join(" ")} movies
          </div>
        )}

        {isLoading &&
          Array(20)
            .fill("")
            .map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading && tvShows}
      </section>
    </MainLayout>
  );
};

export default Movies;
