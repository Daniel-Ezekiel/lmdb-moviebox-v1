import { getPopular, getTopRated, getTrending } from "../../api/allFetches";
import Carousel from "../components/home/Carousel";
import Hero from "../components/home/Hero";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout activePage='home' showFooter={true}>
      <Hero />
      <Carousel sectionName='Popular' queryFn={getPopular} />
      <Carousel sectionName='Trending' queryFn={getTrending} />
      <Carousel sectionName='Top Rated' queryFn={getTopRated} />
    </MainLayout>
  );
};

export default Home;
