import React from "react";
import Image from "next/image";
const PokemonDetail = ({ pokemon }: { pokemon: any }) => {
  const pokemonType = pokemon?.types?.length
    ? pokemon.types[0].type.name
    : "normal";
  const pokemonTypes = {
    fire: "bg-red-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    bug: "bg-yellow-500",
    normal: "bg-purple-500",
    poison: "bg-black",
  };
  const getAbilities = () => {
    let res = "";
    pokemon.abilities.forEach((a: any, i: number) => {
      if (i + 1 === pokemon.abilities.length) res += `${a.ability.name}`;
      else {
        res += `${a.ability.name}, `;
      }
    });
    return res;
  };
  return (
    <div className="container max-w-6xl mx-auto mt-6  rounded-lg shadow-lg bg-neutral-700 flex">
      <div
        className={`w-fit rounded-l-md shadow-xl ${
          pokemonTypes[pokemonType as keyof typeof pokemonTypes]
        }`}
      >
        <Image height={800} width={600} src={pokemon.image} alt={"alt"} />
      </div>
      <div className="p-6 flex flex-col max-w-lg">
        <div className="text-6xl mb-8 text-neutral-50 font-semibold">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </div>
        <div
          className={`text-l px-4 py-1 w-fit font-semibold text-center rounded-md text-neutral-50 ${
            pokemonTypes[pokemonType as keyof typeof pokemonTypes]
          }`}
        >
          {pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1)}
        </div>
        <div className="text-xl mt-4 text-neutral-50 w-fit font-semibold">
          Height :{" "}
          <span className="text-neutral-400"> {pokemon.height} ft.</span>
        </div>
        <div className="text-xl mt-4 text-neutral-50 w-fit font-semibold">
          Weight :{" "}
          <span className="text-neutral-400"> {pokemon.weight} kgs.</span>
        </div>
        <div className="text-xl mt-4 text-neutral-50 w-fit font-semibold">
          EXP :{" "}
          <span className="text-neutral-400">
            {" "}
            {pokemon.base_experience} points.
          </span>
        </div>
        <div className="text-xl mt-4 text-neutral-50 w-fit font-semibold">
          Abilities :{" "}
          <span className="text-neutral-400"> {getAbilities()}</span>
        </div>
        <div className="text-neutral-400 mt-4 text-xl">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
