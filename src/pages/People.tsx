import { PersonProps } from "../../@types";
import MainLayout from "../layout/MainLayout";
import { getPopularPeople } from "../../api/allFetches";
import { useQuery } from "@tanstack/react-query";
import PersonCard from "../components/global/PersonCard";
import SkeletonCard from "../components/global/SkeletonCard";

const People = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: [`popular-people`],
    queryFn: getPopularPeople,
  });

  const people: React.ReactNode[] = data?.results.map((person: PersonProps) => (
    <PersonCard key={person.id} person={person} />
  ));

  return (
    <MainLayout showHeader={true} activePage='movies' showFooter={true}>
      <section className='max-w-[124rem] mx-auto p-3 pt-6 md:pt-[5rem]'>
        <h1 className='flex gap-2 font-semibold text-4xl'>
          People{" "}
          <span className='w-fit font-normal text-sm text-rose'>popular</span>
        </h1>
      </section>

      <section className='max-w-[124rem] mx-auto p-3 grid gap-4 xsm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-4 xl:grid-cols-5'>
        {isError && (
          <div className='col-span-full max-w-[124rem] mx-auto p-3'>
            Error! Could not fetch popular people
          </div>
        )}

        {isLoading &&
          Array(20)
            .fill("")
            .map((_, i) => <SkeletonCard key={i} />)}

        {!isLoading && people}
      </section>
    </MainLayout>
  );
};

export default People;
