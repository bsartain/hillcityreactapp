import React, { useContext, createContext } from "react";
import { MainStore } from "./MainStore";
import { SermonStoreTwo } from "./SermonStoreTwo";
import { useLocalObservable } from "mobx-react";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const pagesStore = useLocalObservable(MainStore);
  const sermonStoreTwo = useLocalObservable(SermonStoreTwo);

  return <StoreContext.Provider value={{ pagesStore, sermonStoreTwo }}>{children}</StoreContext.Provider>;
};

export const usePagesStore = () => useContext(StoreContext);
