import MainLayout from "../layout/MainLayout";

const TVShows = () => {
  return (
    <MainLayout showHeader={true} activePage='tv-shows' showFooter={true}>
      <h1>TV Shows</h1>
    </MainLayout>
  );
};

export default TVShows;
