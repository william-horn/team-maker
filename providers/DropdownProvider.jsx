import { createContext, useContext } from "react";

const DropdownContext = createContext();
export const useDropdownContext = () => useContext(DropdownContext);

const DropdownProvider = ({ children, value }) => {
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  )
}

export default DropdownProvider