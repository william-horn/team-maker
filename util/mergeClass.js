
import { twMerge } from "tailwind-merge";

const mergeClass = (base, imported, state={}) => {
  const final = {...base};

  const recursiveMerge = (baseDir, importedDir) => {
    for (let key in importedDir) {
      const imported_val = importedDir[key];
      const base_val = baseDir[key];

      // If the prop inside the imported class doesn't exist in the base class, then...
      if (!base_val) {

        // copy the prop over if it's an object, otherwise set it equal to the prop
        baseDir[key] = typeof imported_val === "object" ? {...imported_val} : imported_val;

      // otherwise if prop is an object inside base and imported class, then recursively iterate over the imported prop object
      } else if (typeof imported_val === "object" && typeof base_val === "object") {
        baseDir[key] = {...base_val};
        recursiveMerge(baseDir[key], imported_val);

      // otherwise merge the final className in the current directory
      } else if (key === "self") {
        baseDir[key] = twMerge(base_val, imported_val);
        
      } else {

        baseDir[key] = imported_val;
      }
    }
  }

  // merge base styles with imported styles
  recursiveMerge(final, imported);

  if (state.__selected) {
    recursiveMerge(final, final.__selected);
  }

  if (state.__dropdownSelected) {
    recursiveMerge(final, final.__dropdownSelected);
  } 

  if (state.__groupSelected) {
    recursiveMerge(final, final.__groupSelected);
  }

  if (state.__locallySelected) {
    recursiveMerge(final, final.__locallySelected);
  }

  return final;
}

export default mergeClass;