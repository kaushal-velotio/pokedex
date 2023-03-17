import { useAuth } from "@/context/AuthContext";
import { Pokemon } from "@/types/types";
import React from "react";
import PokemonCard from "../Dashboard/PokemonCard";

const PokemonList = ({ list }: { list: Pokemon[] }) => {
  const { user, userFavs } = useAuth();
  return (
    <div className="container mx-auto p-6 mt-6 rounded-md overflow-scroll mb-6 grid lg:grid-cols-4 gap-12 md:grid-cols-2">
      {list?.map((pokemon, index) => {
        return (
          <PokemonCard
            pokemon={pokemon}
            key={pokemon.name}
            index={index + 1}
            favs={userFavs}
            uid={user.uid}
          />
        );
      })}
    </div>
  );
};

export default PokemonList;
