import MainLayout from "../layout/MainLayout";

const Movie = () => {
  return (
    <MainLayout showHeader={true} activePage='movie' showFooter={true}>
      <h1>Movie</h1>
    </MainLayout>
  );
};

export default Movie;
