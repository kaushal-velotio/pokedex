import { useAuth } from "@/context/AuthContext";
import { updateFavorites } from "@/store/firebaseHelpers";
import { Pokemon } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonCard = ({
  pokemon,
  index,
  favs,
  uid,
}: {
  pokemon: Pokemon;
  index: number;
  favs: string[];
  uid: string;
}) => {
  const { setUserFavs } = useAuth();
  const addToFavorites = () => {
    let newFavs = [];
    if (favs.includes(index.toString())) {
      newFavs = [...favs.filter((fav) => fav !== index.toString())];
      setUserFavs(newFavs);
    } else {
      newFavs = [...favs, index.toString()];
      setUserFavs(newFavs);
    }
    updateFavorites(uid, newFavs);
  };
  return (
    <div className="max-w-sm rounded-lg shadow-lg bg-neutral-700">
      <Image
        height={200}
        width={400}
        className="rounded-t-lg"
        src={pokemon.image}
        alt={""}
      />
      <div className="p-6 bg-neutral-800 rounded-b-lg">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h5>
        <p className="mb-10 text-base text-neutral-400">
          Some brief information about the pokemon.
        </p>
        <div className="flex justify-between items-center">
          <Link
            className="bg-purple-500 px-4 py-2 text-center text-white rounded cursor-pointer"
            href={`/pokemons/${index}`}
          >
            Show More
          </Link>
          <div onClick={addToFavorites} className="text-white cursor-pointer">
            {favs.includes(`${index}`) ? (
              <Image height={20} width={40} src={"/red-heart.png"} alt={""} />
            ) : (
              <Image className="opacity-20" height={20} width={40} src={"/heart.png"} alt={""} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
