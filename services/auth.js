// services/auth.js
import { auth } from "../../services/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const signUp = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user role in Firestore
    await setDoc(doc(db, "users", user.uid), { role });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign in an existing user
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
// Anonymous Sign-in
export const anonymousSignIn = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Sign out user
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
