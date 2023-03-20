import { useAuth } from "@context/AuthContext";
import React, { useEffect, useState } from "react";
import PokemonList from "@components/Common/PokemonList";
import { AuthContextType, Pokemon } from "@customTypes/types";

function Favorites() {
  const { userFavs, pokemonList } = useAuth() as AuthContextType;
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  useEffect(() => {
    let filteredResults = pokemonList.filter((p: Pokemon) => {
      return userFavs.includes(p.name);
    });
    setFavorites([...filteredResults]);
    setLoading(false);
  }, [userFavs]);
  return (
    <>{loading ? <div>Loading....</div> : <PokemonList pList={favorites} />}</>
  );
}

export default Favorites;
