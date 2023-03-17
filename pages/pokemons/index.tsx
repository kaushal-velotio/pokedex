import Dashboard from "@/components/Dashboard/Dashboard";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

// async method that fetches all pokemons and adding an image link to each object
const getAllPokemons = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const { results } = await response.json();
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
  return <Dashboard pokemons={data} />;
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
