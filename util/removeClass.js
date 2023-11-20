import removeExtraWhitespace from "./removeExtraWhitespace";

const removeClass = (str, word) => {
  return removeExtraWhitespace(str.replace(word, ''));
}

export default removeClass;