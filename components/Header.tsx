import { protectedRoutes } from "@/constants/const";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";

const SearchBar = () => {
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
                onChange={(e) => setSearchQuery(e.target.value)}
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
};

const Header = () => {
  const { logOut } = useAuth();
  const router = useRouter();
  return (
    <div className=" text-white py-10 px-20 flex justify-between items-center sticky top-0 bg-white bg-opacity-20">
      <div className="flex items-center">
        <span className="text-3xl font-medium mr-2">PokeDex</span>
        <Image
          height={20}
          width={40}
          src={"/pokeball-png-45330.png"}
          alt={""}
        />
      </div>
      {protectedRoutes.includes(router.pathname) ? (
        <>
          <SearchBar />
          <div className="flex">
            <Link
              className="cursor-pointer px-4 py-2 bg-purple-600 rounded-md mr-2"
              href="/favorites"
            >
              Favorites
            </Link>

            <div
              className="cursor-pointer px-4 py-2 bg-neutral-800 rounded-md"
              onClick={() => logOut()}
            >
              Logout
            </div>
          </div>
        </>
      ) : null}
      {router.pathname === "/pokemons/[id]" ? (
        <Link href='/pokemons'  className="cursor-pointer px-4 py-2 bg-neutral-800 rounded-md">
          View All
        </Link >
      ) : null}
    </div>
  );
};

export default Header;
