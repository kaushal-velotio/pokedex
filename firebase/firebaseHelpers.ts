import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { ILoginInput, IRegisterInput, IUser } from "@customTypes/types";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { showToastMessage } from "@utils/utils";

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
    showToastMessage("Something went wrong!");
  }
};

export const logIn = ({ email, password }: ILoginInput) => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    showToastMessage("Something went wrong!");
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    showToastMessage("Something went wrong!");
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
    showToastMessage("Something went wrong!");
  }
};

export const fetchUserDetails = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().favorites;
    } else {
      showToastMessage("Something went wrong!");
    }
  } catch (error) {
    showToastMessage("Something went wrong!");
  }
};

export const updateFavorites = async (uid: string, newFavs: string[]) => {
  const docRef = doc(db, "users", uid);
  updateDoc(docRef, { favorites: newFavs })
    .then((docRef) => {
      console.log("Record modified!");
    })
    .catch((error) => {
      showToastMessage("Something went wrong!");
    });
};
