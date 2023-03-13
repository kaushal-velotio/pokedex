import Image from "next/image";
import React from "react";

const PokemonCard = () => {
  return (
    <div className="block max-w-sm rounded-lg  shadow-lg bg-neutral-700">
      <Image
        height={200}
        width={400}
        className="rounded-t-lg"
        src={"https://tecdn.b-cdn.net/img/new/standard/nature/186.jpg"}
        alt={""}
      />
      <div className="p-6 bg-neutral-800 rounded-b-lg">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-50">
          Card title
        </h5>
        <p className="mb-4 text-base text-neutral-400">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button className="bg-purple-500 px-4 py-2 text-center text-white mt-5 rounded cursor-pointer">
          Show More
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
