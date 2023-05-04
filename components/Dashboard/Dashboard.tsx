import PokemonList from "@components/Common/PokemonList";
import { useAuth } from "@context/AuthContext";
import { AuthContextType, Pokemon, PokemonListProps } from "@customTypes/types";
import React, { useEffect } from "react";
import { fetchUserDetails } from "@firebase/firebaseHelpers";

function Dashboard({ pList }: PokemonListProps) {
  const { searchQuery, user, setUserFavs, pokemonList, setPokemonList } =
    useAuth() as AuthContextType;
  let filteredPokemons = [...pList];
  if (searchQuery?.length) {
    filteredPokemons = pList.filter((pokemon: Pokemon) => {
      return pokemon.name.includes(searchQuery);
    });
  }
  useEffect(() => {
    async function fetchUserDetailsAndSetInStore() {
      if (user?.uid) {
        const favs = await fetchUserDetails(user.uid);
        setUserFavs(favs);
      }
    }
    fetchUserDetailsAndSetInStore();
  }, [user]);

  useEffect(() => {
    if (!pokemonList?.length && pList.length) setPokemonList(pList);
  }, [pList]);

  return <PokemonList pList={filteredPokemons} />;
}

export default Dashboard;
