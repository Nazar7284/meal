import CategoryList from "../../components/CategoryList";
import SearhRecipe from "../../components/SearchRecipe";

const Home: React.FC = () => {
  return (
    <>
      <SearhRecipe />
      <CategoryList />
    </>
  );
};

export default Home;
