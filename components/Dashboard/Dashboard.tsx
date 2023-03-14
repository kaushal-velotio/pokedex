import { Pokemon } from "@/types/types";
import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const Dashboard = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const [pokemonList, setpokemonList] = useState<Pokemon[]>([]);
  useEffect(() => {
    if (pokemons?.length) {
      setpokemonList(pokemons);
    }
  }, [pokemons]);
  return (
    <div className="container mx-auto p-6 mt-6 rounded-md overflow-scroll mb-6 grid lg:grid-cols-4 gap-12 md:grid-cols-2">
      {pokemonList?.map((pokemon,index) => {
        return <PokemonCard pokemon={pokemon} key={pokemon.name} index={index} />;
      })}
    </div>
  );
};

export default Dashboard;
