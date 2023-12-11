
import { twMerge } from "tailwind-merge";

const mergeClass = (base, imported, state={}) => {
  const final = {...base};

  const recursiveMerge = (baseDir, importedDir) => {
    for (let key in importedDir) {
      const imported_val = importedDir[key];
      const base_val = baseDir[key];

      if (!base_val) {
        baseDir[key] = typeof imported_val === "object" ? {...imported_val} : imported_val;

      } else if (typeof imported_val === "object" && typeof base_val === "object") {
        recursiveMerge(base_val, imported_val);

      } else if (key === "self") {
        baseDir[key] = twMerge(base_val, imported_val);
      }
    }
  }

  // merge base styles with imported styles
  recursiveMerge(final, imported);

  // override styles based on state
  if (state._isSelected) {
    recursiveMerge(final, final.__selected);
  }

  return final;
}

export default mergeClass;