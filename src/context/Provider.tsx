import React, { createContext, useState, useEffect, ReactNode } from "react";

interface ContextType {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  dropDown: boolean;
  setDropDown: React.Dispatch<React.SetStateAction<boolean>>;
  theme: "dark" | "light";
  setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

export const AppContext = createContext<ContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export const ContextProvider = ({ children }: ProviderProps) => {
  const [modalActive, setModalActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  return (
    <AppContext.Provider
      value={{
        modalActive,
        dropDown,
        theme,
        setModalActive,
        setDropDown,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
