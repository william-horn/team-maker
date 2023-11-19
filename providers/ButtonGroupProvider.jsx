import { createContext, useContext } from "react";

const ButtonGroupContext = createContext();
export const useButtonGroupContext = () => useContext(ButtonGroupContext);

const ButtonGroupProvider = ({ children, value }) => {
  return (
    <ButtonGroupContext.Provider value={value}>
      {children}
    </ButtonGroupContext.Provider>
  )
}

export default ButtonGroupProvider