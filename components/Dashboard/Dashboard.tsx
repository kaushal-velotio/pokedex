import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

const Dashboard = () => {
  const [pokemonList, setpokemonList] = useState([]);
  useEffect(() => {}, []);
  return (
    <div className="container mx-auto p-6 mt-6 rounded-md overflow-scroll mb-6 grid lg:grid-cols-4 gap-12 md:grid-cols-2">
      <PokemonCard/>
      <PokemonCard/>
      <PokemonCard/>
      <PokemonCard/>
      <PokemonCard/>
    </div>
  );
};

export default Dashboard;
