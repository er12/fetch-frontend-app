import { createContext, useContext } from "react";

type DogContextType = {
    onFavoriteChange: (dogId: string) => void;
};

export const DogContext = createContext<DogContextType | undefined>(undefined);

export const useDog = () => {
  const context = useContext(DogContext);
  if (!context) throw new Error("useDog must be used within DogProvider");
  return context;
};
