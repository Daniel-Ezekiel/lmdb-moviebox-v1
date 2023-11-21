import MainLayout from "../layout/MainLayout";

const Person = () => {
  return (
    <MainLayout showHeader={true} activePage='person' showFooter={true}>
      <h1>Person</h1>
    </MainLayout>
  );
};

export default Person;
