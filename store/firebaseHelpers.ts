import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { ILoginInput, IRegisterInput, IUser, UserType } from "@/types/types";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const signUp = ({
  firstname,
  lastname,
  password,
  email,
}: IRegisterInput) => {
  try {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (creds) => {
        let addUserReq: IUser = {
          id: creds.user.uid,
          email,
          firstname,
          lastname,
          favorites: [],
        };
        addUser(addUserReq);
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const logIn = ({ email, password }: ILoginInput) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async ({
  id,
  email,
  firstname,
  lastname,
  favorites,
}: IUser) => {
  try {
    await setDoc(doc(db, "users", id), {
      email,
      firstname,
      lastname,
      favorites,
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserDetails = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().favorites;
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateFavorites = async (uid: string, newFavs: string[]) => {
  const docRef = doc(db, "users", uid);
  updateDoc(docRef, { favorites: newFavs })
    .then((docRef) => {
      console.log("Record modified!");
    })
    .catch((error) => {
      console.log(error);
    });
};
