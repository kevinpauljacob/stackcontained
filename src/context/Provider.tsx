import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ContextType {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  dropDown: boolean;
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  newSnippetModal: boolean;
  setNewSnippetModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ProviderProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [newSnippetModal, setNewSnippetModal] = useState(false);

  return (
    <AppContext.Provider
      value={{
        modalActive,
        dropDown,
        theme,
        newSnippetModal,
        setModalActive,
        setDropDown,
        setTheme,
        setNewSnippetModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
