import React, { useContext, createContext } from "react";
import { MainStore } from "./MainStore";
import { SermonStore } from "./SermonStore";
import { useLocalObservable } from "mobx-react";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const pagesStore = useLocalObservable(MainStore);
  const sermonStore = useLocalObservable(SermonStore);

  return <StoreContext.Provider value={{ pagesStore, sermonStore }}>{children}</StoreContext.Provider>;
};

export const usePagesStore = () => useContext(StoreContext);
