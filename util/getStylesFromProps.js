import stringIsEmpty from "./stringIsEmpty";


const getStylesFromProps = (initialStyles, preset, state) => {
  const updatedStyles = {};
  
  const deepSearch = (dirPreset, dirInitial, dirCurrent) => {
    dirCurrent.self = "";

    for (key in dirPreset) {
      let presetVal = dirPreset[key];
      const initialVal = dirInitial[key];
      const valSelected = key.match(/-selected+$/);
      const finalKey = valSelected ? key.substring(0, valSelected.index) : key;

      if (typeof presetVal === 'boolean') {
        presetVal = finalKey;
      }

      if (initialVal === undefined) {
        dirCurrent.self += ` ${presetVal}`

      } else if (typeof presetVal === "object") {
        const subDir = {};
        dirCurrent[key] = subDir;
        deepSearch(presetVal, initialVal, subDir);

      } else if (valSelected && state._isSelected) {
        dirCurrent.self += ` ${presetVal}`;

      } else if (!valSelected) {
        dirCurrent.self += ` ${presetVal}`;
      }
    }
  }

  deepSearch(preset, initialStyles, updatedStyles);

  return updatedStyles;
}

export default getStylesFromProps;

/*
  styles = {
    "bg": "thing",
    "color": "a",

    inner: {
      "bg": "something"
    }
  }

  =>

  styles = {
    self: "bg-thing color-a",
    inner: {
      self: "bg-something"
    }
  }
*/
