import { useContext, useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import { User } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import MovieTvCard from "../components/global/MovieTvCard";
import PersonCard from "../components/global/PersonCard";
import { MovieProps, PersonProps, TVProps } from "../../@types";

interface FavProps {
  id: number;
  type: string;
  name: string;
  date: string | null;
  poster_path: string;
}

const Favourites = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [category, setCategory] = useState("all");
  const [favourites, setFavourites] = useState<[]>([]);

  const { currentUser }: { currentUser?: User } = useContext(AuthContext);
  const { isLoggedIn }: { isLoggedIn?: boolean } = useContext(AuthContext);

  const dataToDisplay: React.ReactNode[] =
    category === "all"
      ? favourites.map((fav) => {
          return (fav as FavProps).type == "movie" ? (
            <MovieTvCard
              key={(fav as MovieProps).id}
              type='movie'
              movieOrTv={fav}
            />
          ) : (fav as FavProps).type == "tv" ? (
            <MovieTvCard key={(fav as TVProps).id} type='tv' movieOrTv={fav} />
          ) : (
            <PersonCard key={(fav as PersonProps).id} person={fav} />
          );
        })
      : favourites
          .filter((fav) => (fav as FavProps).type === category)
          .map((fav) => {
            return (fav as FavProps).type == "movie" ? (
              <MovieTvCard
                key={(fav as MovieProps).id}
                type='movie'
                movieOrTv={fav}
              />
            ) : (fav as FavProps).type == "tv" ? (
              <MovieTvCard
                key={(fav as TVProps).id}
                type='tv'
                movieOrTv={fav}
              />
            ) : (
              <PersonCard key={(fav as PersonProps).id} person={fav} />
            );
          });

  useEffect(() => {
    const getFavData = async () => {
      if (isLoggedIn && currentUser != null) {
        const favRef = doc(db, "users", currentUser!.uid);
        const favSnap = await getDoc(favRef);

        try {
          if (favSnap.exists()) {
            const res = favSnap.data();

            category === "all"
              ? setFavourites(res?.favourites)
              : setFavourites(
                  res?.favourites.filter(
                    (fav: { type: string }) => fav.type == category
                  )
                );
          } else {
            // favSnap.data() will be undefined in this case
            console.log("No such document!");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFavData();
  }, [currentUser, category]);

  return (
    <MainLayout showHeader={true} activePage='search' showFooter={true}>
      <section className='max-w-[124rem] mx-auto grid grid-cols-[1fr,_auto] gap-3 p-3 md:py-6'>
        <div className='flex items-center'>
          <h1 className='font-bold text-3xl xl:text-5xl'>
            Favourites{" "}
            <span className='text-sm  font-normal text-rose align-text-top'>
              {category === "movie"
                ? "movies"
                : category === "tv"
                ? "TV Shows"
                : category === "person"
                ? "People"
                : "All"}
            </span>
          </h1>
        </div>

        <div className='justify-self-end align-self-center'>
          <select
            name='category'
            id='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className='h-full  rounded-lg p-2 border-[0.1rem] shadow-lg text-base xsm:w-[15rem]'
          >
            <option value='all'>All</option>
            <option value='movie'>Movies</option>
            <option value='tv'>TV Shows</option>
            <option value='person'>People</option>
          </select>
        </div>

        <div className='col-span-full mt-4 grid gap-4 xsm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {!favourites.length && (
            <p className=' col-span-full place-self-center text-base'>
              You have not added any{" "}
              {category === "all"
                ? "favourites."
                : `${category} to your favourites.`}
            </p>
          )}

          {favourites.length && dataToDisplay}
        </div>
      </section>
    </MainLayout>
  );
};

export default Favourites;
