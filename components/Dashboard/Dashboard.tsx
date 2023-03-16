import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { fetchUserDetails } from "@/store/firebaseHelpers";
import { Pokemon } from "@/types/types";
import React, { useEffect } from "react";
import PokemonCard from "./PokemonCard";

const Dashboard = ({ pokemons }: { pokemons: Pokemon[] }) => {
  const { searchQuery, user, userFavs, setUserFavs } = useAuth();
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

  return (
    <div className="container mx-auto p-6 mt-6 rounded-md overflow-scroll mb-6 grid lg:grid-cols-4 gap-12 md:grid-cols-2">
      {filteredPokemons?.map((pokemon, index) => {
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

export default Dashboard;
