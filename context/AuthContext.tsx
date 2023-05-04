import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { onIdTokenChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { AuthContextType, Pokemon, UserType } from "@customTypes/types";
import nookies from "nookies";
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext<AuthContextType | null>(AuthContext);
export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [userFavs, setUserFavs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setUser({
          email: user.email,
          uid: user.uid,
        });
        nookies.set(undefined, "token", token, { path: "/" });
      } else {
        setUser({ email: null, uid: null });
        nookies.set(undefined, "token", "", { path: "/" });
      }
    });
    setLoading(false);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
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
}
