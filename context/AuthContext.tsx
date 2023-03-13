import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { ILoginInput, IRegisterInput, UserType } from "@/types/types";
import { doc, setDoc } from "firebase/firestore";
const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
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

  const signUp = ({ firstname, lastname, password, email }: IRegisterInput) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = ({ email, password }: ILoginInput) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    setUserLoaded(false);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userLoaded, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
