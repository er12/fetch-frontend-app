import { createContext, useContext } from "react";

type ZipCodesContextType = {
    setZipCodes:  React.Dispatch<React.SetStateAction<string[]>>;
};

export const ZipCodesContext = createContext<ZipCodesContextType | undefined>(undefined);

export const useZipCodes = () => {
  const context = useContext(ZipCodesContext);
  if (!context) throw new Error("useZipCodes must be used within ZipCodesProvider");
  return context;
};
