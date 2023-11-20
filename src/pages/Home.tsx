import {
  getPopular,
  getTopRated,
  getTrending,
  getUpcoming,
} from "../../api/allFetches";
import Carousel from "../components/home/Carousel";
import Hero from "../components/home/Hero";
import MainLayout from "../layout/MainLayout";

const Home = () => {
  return (
    <MainLayout activePage='home' showFooter={true}>
      <Hero />
      <Carousel sectionName='trending' multiType={true} queryFn={getTrending} />
      <Carousel sectionName='popular' multiType={true} queryFn={getPopular} />
      <Carousel
        sectionName='top rated'
        multiType={true}
        queryFn={getTopRated}
      />
      <Carousel
        sectionName='upcoming'
        multiType={false}
        queryFn={getUpcoming}
      />
    </MainLayout>
  );
};

export default Home;
