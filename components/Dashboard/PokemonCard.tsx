import { Pokemon } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PokemonCard = ({
  pokemon,
  index,
}: {
  pokemon: Pokemon;
  index: number;
}) => {
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
        <Link
          className="bg-purple-500 px-4 py-2 text-center text-white mt-5 rounded cursor-pointer"
          href={`/pokemons/${index + 1}`}
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default PokemonCard;
