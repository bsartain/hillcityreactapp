import React, { useContext, createContext } from "react";
import { PagesStore } from "./PagesStore";
import { SermonStore } from "./SermonStore";
import { useLocalObservable } from "mobx-react";

export const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const pagesStore = useLocalObservable(PagesStore);
  const sermonStore = useLocalObservable(SermonStore);

  return <StoreContext.Provider value={{ pagesStore, sermonStore }}>{children}</StoreContext.Provider>;
};

export const usePagesStore = () => useContext(StoreContext);