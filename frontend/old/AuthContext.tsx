import React from 'react';
// import { createContext, useState, useContext, useEffect } from 'react';
import firebase from "firebase/app";
import { auth } from './firebase';
// import { ReactNode } from 'react';


const AuthContext = React.createContext<firebase.User|null>(any);

export function useAuthContext() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: {
	children: React.ReactNode
}) {
  const [user, setUser] = React.useState<firebase.User|null>(null);

  const value = {
    user,
  };

  React.useEffect(() => {
	const unsubscribed = auth.onAuthStateChanged((user) => {
	  console.log(user);
	  setUser(user);
	});
	return () => {
	  unsubscribed();
	};
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}