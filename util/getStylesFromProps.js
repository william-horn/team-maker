import stringIsEmpty from "./stringIsEmpty";
import removeExtraWhitespace from "./removeExtraWhitespace";

export const applyPresetStyles = (stylesDir={}, presetDir={}) => {
  for (let key in presetDir) {
    const preset_val = presetDir[key];
    const styles_val = stylesDir[key];

    if (typeof preset_val === "object" && typeof styles_val === "object") {
      applyPresetStyles(styles_val, preset_val);
    } else {
      stylesDir[key] = preset_val;
    }
  }

  return stylesDir;
}

export const getStylesFromProps = (initialStyles, presetArray, state={}) => {
  const preset = applyPresetStyles(...presetArray);
  const initialStyles__copy = {...initialStyles}; // merged initial styles with preset styles
  const stagedStyles = {}; // hold all styles computed with state
  const renderedStyles = {};
  
  const stylesCache = {
    _isSelected: [],
  }

  // First merge preset styles with initial styles
  applyPresetStyles(initialStyles__copy, preset);

  // ...then extract the non-state affected classes into the "stagedStyles" object, while
  // caching the stateful classes
  const extractBaseStyles = (stylesDir, stagedDir) => {
    for (let key in stylesDir) {
      let val = stylesDir[key];
      const val_isSelected = key.match(/-selected+$/);
      const root_key = val_isSelected ? key.substring(0, val_isSelected.index) : key;

      if (!val_isSelected) {
        if (typeof val === "object") {
          const newDir = {};
          stagedDir[root_key] = newDir;
          extractBaseStyles(val, newDir);

        } else {
          stagedDir[root_key] = val;
        }

      } else {

        stylesCache._isSelected.push([stagedDir, root_key, val]);
      }
    }
  }

  extractBaseStyles(initialStyles__copy, stagedStyles);

  // ...then update the staged classes with the cached stateful classes based on state
  if (state._isSelected) {
    const cacheDir = stylesCache._isSelected;

    for (let i = 0; i < cacheDir.length; i++) {
      const selected = cacheDir[i];
      selected[0][selected[1]] = selected[2];
    }
  }

  // ...then create new object with compiled tailwind classes
  const compileRenderedStyles = (stagedDir, renderedDir) => {
    renderedDir.self = "";

    for (let key in stagedDir) {
      let val = stagedDir[key];

      if (typeof val === "boolean") {
        if (val === true) {
          val = key;
        } else if (val === false) {
          continue;
        }
      }

      if (!key.match('^_')) {
        if (typeof val === "object") {
          const newDir = {};
          renderedDir[key] = newDir;
          compileRenderedStyles(val, newDir);
        } else {
          renderedDir.self += ` ${val}`;
        }
      } else {
        renderedDir[key] = val;
      }
    }

    renderedDir.self = removeExtraWhitespace(renderedDir.self);
  }

  compileRenderedStyles(stagedStyles, renderedStyles);
  
  return renderedStyles;

  /*
  input {
    "bg-color": "class-a",
    "text-color": "class-b",
    ...,
    inner: {
      "bg-color": "class-a",
      "text-color": "class-b",
      ...
    }

    _component {
      "bg-color": "class-c",
      "text-color": "class-d",
      ...
    }
  }

  =>

  styles {
    self: "class-a class-b ...",
    inner: {
      self: "class-a class-b ..."
    }
    _component {
      "bg-color": "class-c",
      "text-color": "class-d",
      ...
    }
  }
  */
}

export default getStylesFromProps;

