import PokemonList from "@components/Common/PokemonList";
import { useAuth } from "@context/AuthContext";
import { Pokemon, PokemonListProps } from "@customTypes/types";
import React, { useEffect } from "react";
import { fetchUserDetails } from "@firebase/firebaseHelpers";

function Dashboard({ pList }: PokemonListProps) {
  const { searchQuery, user, setUserFavs, pokemonList, setPokemonList } =
    useAuth();
  let filteredPokemons = [...pList];

  // filtering pokemons based on the search query
  if (searchQuery?.length) {
    filteredPokemons = pList.filter((pokemon: Pokemon) => {
      return pokemon.name.includes(searchQuery);
    });
  }

  // fetches the list of all pokemons marked as a favorite
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
