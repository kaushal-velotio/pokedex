import { useAuth } from "@/context/AuthContext";
import { Pokemon } from "@/types/types";
import React, { useEffect, useState } from "react";
import PokemonList from "./Common/PokemonList";

const Favorites = () => {
  const { userFavs, pokemonList } = useAuth();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  useEffect(() => {
    let filteredResults = pokemonList.filter((p: Pokemon, index: number) => {
      return userFavs.includes(p.name);
    });
    setFavorites([...filteredResults]);
    setLoading(false);
  }, [userFavs]);
  return (
    <>{loading ? <div>Loading....</div> : <PokemonList list={favorites} />}</>
  );
};

export default Favorites;
