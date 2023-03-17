import PokemonCard from "@components/Dashboard/PokemonCard";
import { useAuth } from "@context/AuthContext";
import { PokemonListProps } from "@customTypes/types";

function PokemonList({ pList }: PokemonListProps) {
  const { user, userFavs } = useAuth();
  return (
    <div className="container mx-auto p-6 mt-6 rounded-md overflow-scroll mb-6 grid lg:grid-cols-4 gap-12 md:grid-cols-2">
      {pList.map((pokemon, index) => {
        return (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.name}
            favs={userFavs}
            uid={user.uid}
          />
        );
      })}
    </div>
  );
}

export default PokemonList;
