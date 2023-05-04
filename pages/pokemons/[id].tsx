import PokemonDetail from "@components/PokemonDetail";
import { GetStaticProps } from "next";
import { myFetch } from "utils/utils";
const getPokemonDetail = async (id: string) => {
  try {
    const jsonRes = await myFetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const imgIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${imgIndex}.png`;
    return { ...jsonRes, image };
  } catch (error) {
    console.log(error);
  }
};

const PokemonDetailPage = ({ pokemon }: { pokemon: any }) => {
  return <PokemonDetail pokemon={pokemon} />;
};
export default PokemonDetailPage;

export async function getStaticPaths() {
  let paths = [];
  for (let i = 1; i <= 151; i++) {
    paths.push({
      params: { id: `${i}` },
    });
  }
  return { paths, fallback: true };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let id: string = params?.id as string;
  const pokemon = await getPokemonDetail(id);
  return {
    props: { pokemon },
  };
};
