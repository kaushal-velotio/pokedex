import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@context/AuthContext";
import { enumPokeDex } from "@constants/const";
import { logOut } from "@firebase/firebaseHelpers";
import { AuthContextType, SearchBarProps } from "@customTypes/types";

function SearchBar({ setGlobalQuery }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <form>
        <div className="max-w-xl">
          <div className="flex">
            <div className="flex rounded-md overflow-hidden">
              <input
                type="text"
                className="px-5 w-full rounded-md rounded-r-none text-neutral-900 focus:outline-none"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setGlobalQuery(e.target.value);
                }}
                value={searchQuery}
              />
              <button className="bg-neutral-900  px-6 text-lg py-3 rounded-r-md font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function Header() {
  const { setSearchQuery } = useAuth() as AuthContextType;
  const router = useRouter();

  const shouldShowSearchBarAndFavoritesButton = () => {
    if (enumPokeDex.FAV_ROUTES?.includes(router.pathname)) {
      return (
        <>
          <SearchBar setGlobalQuery={setSearchQuery} />
          <div className="flex">
            <Link
              className="cursor-pointer px-4 py-2 bg-purple-600 rounded-md mr-2"
              href="/favorites"
            >
              My Pokemons
            </Link>

            <div
              className="cursor-pointer px-4 py-2 bg-neutral-800 rounded-md"
              onClick={() => logOutHandler()}
            >
              Logout
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  const shouldShowViewAllButton = () => {
    if (enumPokeDex.VIEW_ALL_ROUTES?.includes(router.pathname)) {
      return (
        <div className="flex">
          <Link
            href="/pokemons"
            className="cursor-pointer flex px-4 py-2 bg-purple-600 rounded-md mr-2"
          >
            <Image
              className="mr-2"
              height={5}
              width={20}
              src={"/back.png"}
              alt={""}
            />
            View All
          </Link>

          <div
            className="cursor-pointer px-4 py-2 bg-neutral-800 rounded-md"
            onClick={() => logOut()}
          >
            Logout
          </div>
        </div>
      );
    }
    return null;
  };

  const logOutHandler = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {}
  };

  return (
    <div className=" text-white py-10 px-20 flex justify-between items-center sticky top-0 bg-white bg-opacity-20">
      <div className="flex items-center">
        <span className="text-3xl font-bold mr-2">PokeDex</span>
        <Image
          height={20}
          width={40}
          src={"/pokeball-png-45330.png"}
          alt={"logo"}
        />
      </div>
      {shouldShowSearchBarAndFavoritesButton()}
      {shouldShowViewAllButton()}
    </div>
  );
}

export default Header;
