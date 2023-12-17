import { createContext, useContext } from "react";

const DropdownSelectionContext = createContext();
export const useDropdownSelectionContext = () => useContext(DropdownSelectionContext);

const DropdownSelectionProvider = ({ children, value }) => {
  return (
    <DropdownSelectionContext.Provider value={value}>
      {children}
    </DropdownSelectionContext.Provider>
  )
}

export default DropdownSelectionProvider