import { Pokemon } from "@customTypes/types";
import { toast } from "react-toastify";

export const myFetch = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

export const formatPokemonName = (pokemon: Pokemon) => {
  return pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
};

export const showToastMessage = (message: string) => {
  toast(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    progressStyle: { backgroundColor: "white" },
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    style: { backgroundColor: "red", color: "white", fontWeight: "600" },
  });
};
