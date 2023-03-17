import { useAuth } from "@/context/AuthContext";
import { fetchUserDetails } from "@/store/firebaseHelpers";
import { Pokemon } from "@/types/types";
import React, { useEffect } from "react";
import PokemonList from "../Common/PokemonList";

const Dashboard = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const { searchQuery, user, setUserFavs, pokemonList, setPokemonList } =
    useAuth();
  let filteredPokemons = [...pokemons];

  // filtering pokemons based on the search query
  if (searchQuery?.length) {
    filteredPokemons = pokemons?.filter((pokemon: Pokemon) => {
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
    if (!pokemonList?.length && pokemons?.length) setPokemonList(pokemons);
  }, [pokemons]);

  return <PokemonList list={filteredPokemons} />;
};

export default Dashboard;
