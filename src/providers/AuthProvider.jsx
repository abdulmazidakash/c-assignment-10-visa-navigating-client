import React, { useState, createContext, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import app from "../services/authService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  // Listen for authentication state to change.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the user state when authentication state changes
      setLoading(false); // Set loading to false when authentication state is determined
    });
    return () => {
      unsubscribe(); // Cleanup the subscription on component unmount
    };
  }, [auth]);

  // create account with email and password and store user image link and name
  const createAccount = (email, password, name, photoURL) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject("Email is required");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          updateUserProfile(name, photoURL);
          resolve(result.user);
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Error creating account: " + errorMessage);
          Swal.fire("Signup Error", errorMessage, "error");
          reject(errorMessage);
        });
    });
  };

  //function to sign in with Google
  const googleSignIn = (way) => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
        console.log("way ");
        window.location.href = way;
        // swall message for successfull modal
        Swal.fire({
          icon: "success",
          title: "Login Successfull",
          text: "Welcome to the website",
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  //for logout function
  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Clear the user state on sign out
      })
      .catch((error) => {
        console.error("Error signing out: " + error.message); // Log sign out error
      });
  };

  // Update user profile
  const updateUserProfile = (displayName, photoURL) => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      })
        .then(() => {
          setUser({ ...auth.currentUser, displayName, photoURL }); // Update the user state with the new profile information
        })
        .catch((error) => {
          console.error("Error updating profile: " + error.message); // Log profile update error
        });
    }
  };

  // Sign in with email and password
  const signInUser = (email, password) => {
    return new Promise((resolve, reject) => {
      if (!email) {
        reject("Email is required");
        return;
      }
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          setUser(result.user); // Set the user state with the authenticated user

          resolve(result.user); // Resolve the promise with the user data
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Error signing in: " + errorMessage); // Log wrong credentials
          Swal.fire("Login Error", errorMessage, "error");
          reject(errorMessage); // Reject the promise with the error message
        });
    });
  };

  const contextValue = {
    user,
    setUser,
    googleSignIn,
    signOutUser,
    loading,
    setLoading,
    updateUserProfile,
    signInUser,
    createAccount,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;