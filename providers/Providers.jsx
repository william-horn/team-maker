import { createContext, useContext } from "react";
import Enum from "@/enum";

const ProviderNameEnums = Enum.ProviderNames.getEnumItems();

const contexts = {};
const Providers = {};

for (let contextName in ProviderNameEnums) {
  const ProviderName = ProviderNameEnums[contextName].value;
  const context = createContext();

  // initialize context namespace
  contexts[ProviderName] = context;

  // component instantiater
  Providers[ProviderName] = ({ children, value }) => (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  );
}

export const useComponentContext = ProviderNameEnum => useContext(contexts[ProviderNameEnum.value]);

export default Providers;