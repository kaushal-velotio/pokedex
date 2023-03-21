import Dashboard from "@components/Dashboard/Dashboard";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { myFetch } from "utils/utils";
const getAllPokemons = async () => {
  try {
    const { results } = await myFetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokemonList = results.map((res: any, index: number) => {
      const imgIndex = ("00" + (index + 1)).slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgIndex}.png`;
      return { ...res, image, id: index + 1 };
    });
    return pokemonList;
  } catch (error) {
    console.log(error);
  }
};

const DashboardPage = () => {
  const { data } = useQuery(["allPokemons"], getAllPokemons);
  return <Dashboard pList={data} />;
};

export default DashboardPage;

export async function getStaticProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["allPokemons"], getAllPokemons);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
