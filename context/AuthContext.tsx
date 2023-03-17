import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Pokemon, UserType } from "@/types/types";
const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [userFavs, setUserFavs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoaded(true);
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoaded,
        searchQuery,
        setSearchQuery,
        userFavs,
        setUserFavs,
        pokemonList,
        setPokemonList,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
