
import { twMerge } from "tailwind-merge";

const mergeClass = (base, imported) => {
  const final = {...base};

  const recursiveMerge = (baseDir, importedDir) => {
    for (let key in importedDir) {
      const imported_val = importedDir[key];
      const base_val = baseDir[key];

      if (typeof imported_val === "object" && typeof base_val === "object") {
        console.log('new dir: ', key);
        recursiveMerge(base_val, imported_val);

      } else if (key === "self") {
        baseDir[key] = twMerge(base_val, imported_val);
        console.log('new class: ', baseDir.self);
      }
    }
  }

  recursiveMerge(final, imported);
  return final;
}

export default mergeClass;