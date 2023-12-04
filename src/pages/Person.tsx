import { useParams } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getPersonDetails } from "../../api/allFetches";
import Socials from "../components/person/Socials";
import { calcAge, formatDate } from "../../utils/formatDate";
import PersonCredits from "../components/person/PersonCredits";

const Person = () => {
  const { id } = useParams();

  const personId: number = Number(
    (id as string).slice((id as string).lastIndexOf("-") + 1)
  );

  const genders: string[] = [
    "Not set/not specified",
    "Female",
    "Male",
    "Non-binary",
  ];

  const { isLoading, isError, data } = useQuery({
    queryKey: [`${id?.toLowerCase()}-details`],
    queryFn: () => getPersonDetails(personId),
  });

  console.log(!isLoading && !isError && data);

  return (
    <MainLayout showHeader={true} activePage='person' showFooter={true}>
      {!isLoading && !isError && (
        <div className='max-w-[124rem] mx-auto p-4 md:flex md:flex-wrap md:justify-start md:items-start md:gap-x-4 lg:gap-x-8'>
          <h1 className='w-full my-4 font-bold text-3xl text-rose xl:text-5xl'>
            {data?.name}
          </h1>
          <section className='flex flex-col justify-center items-center gap-4 border-b-2 border-b-gray-200 md:w-[20%] md:border-none'>
            <div className='h-[28rem] md-w-full md:h-auto'>
              <img
                src={
                  data?.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${data?.profile_path}`
                    : "/movie-poster-placeholder.svg"
                }
                alt={data.name}
                className='w-full h-full rounded-lg object-center object-cover'
              />
            </div>
            <Socials personId={personId} />
            <div className='w-full'>
              <h2 className='mb-4 font-medium text-xl'>
                More Info about{" "}
                <span className='text-rose'>{data?.name.split(" ")[0]}</span>
              </h2>

              <p className='mb-4 flex flex-col gap-2 text-base'>
                <span className='font-semibold'>Gender</span>
                {genders[data?.gender]}
              </p>

              <p className='mb-4 flex flex-col gap-2 text-base'>
                <span className='font-semibold'>Aliases</span>
                {data?.also_known_as.join(", ")}
              </p>

              <p className='mb-4 flex flex-col gap-2 text-base'>
                <span className='font-semibold'>Popularly known for</span>
                {data?.known_for_department}
              </p>

              <p className='mb-4 flex flex-col gap-2 text-base'>
                <span className='font-semibold'>Date of Birth</span>
                {formatDate(data?.birthday)} (
                {!data?.death_day && calcAge(data?.birthday)} years old)
              </p>

              <p className='mb-4 flex flex-col gap-2 text-base'>
                <span className='font-semibold'>Birthplace</span>
                {data?.place_of_birth}
              </p>
            </div>
          </section>

          <section className='mt-6 md:mt-[0] md:max-w-[75%]'>
            <div>
              <h2 className='my-2 mb-4 font-semibold text-xl md:mt-[0]'>
                {data?.name.split(" ")[0]}'s{" "}
                <span className='text-rose'>Biography</span>
              </h2>
              <div>
                <p className='max-h-[37.5rem] pb-4 overflow-auto text-base'>
                  {data?.biography}
                </p>
              </div>
            </div>

            <PersonCredits
              knownFor={data?.known_for_department}
              personId={personId}
            />
          </section>
        </div>
      )}
    </MainLayout>
  );
};

export default Person;
