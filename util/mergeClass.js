
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
        recursiveMerge(base_val, imported_val);

      // otherwise merge the final className in the current directory
      } else if (key === "self") {
        baseDir[key] = twMerge(base_val, imported_val);

      // copy over all custom non-className entries
      } else {
        baseDir[key] = imported_val;
      }
    }
  }

  // merge base styles with imported styles
  recursiveMerge(final, imported);

  // override styles based on state
  if (state._isHovered) {
    recursiveMerge(final, final.__hovered);
  }

  if (state._isSelected) {
    recursiveMerge(final, final.__selected);
  }

  return final;
}

export default mergeClass;