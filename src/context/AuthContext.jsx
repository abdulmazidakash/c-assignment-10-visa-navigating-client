import React, { useState, createContext, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const googleProvider = new GoogleAuthProvider();

  // Listen for authentication state to change.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
      setUser(user); // Set the user state when authentication state changes
      setLoading(false); // Set loading to false when authentication state is determined
    });
    return () => {
      unsubscribe(); // Cleanup the subscription on component unmount
    };
  }, []);

  //function to sign in with Google

  const googleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //for logout function
  const signOutUser = () => {
    signOut(getAuth(app))
      .then(() => {
        setUser(null); // Clear the user state on sign out
      })
      .catch((error) => {
        notify("Error signing out: " + error.message); // Notify on sign out error
      });
  };

  // Update user profile
  const updateUserProfile = (displayName, photoURL) => {
    const auth = getAuth(app);
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      })
        .then(() => {
          setUser({ ...auth.currentUser, displayName, photoURL }); // Update the user state with the new profile information
        })
        .catch((error) => {
          notify("Error updating profile: " + error.message); // Notify on profile update error
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
      signInWithEmailAndPassword(getAuth(app), email, password)
        .then((result) => {
          setUser(result.user); // Set the user state with the authenticated user
          notify("Successfully logged in with email and password"); // Notify on successful email/password login
          resolve(result.user); // Resolve the promise with the user data
        })
        .catch((error) => {
          const errorMessage = error.message;
          notify("Error signing in: " + errorMessage); // Notify on wrong credentials
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
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
