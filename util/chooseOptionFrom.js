import stringIsEmpty from "./stringIsEmpty";

const chooseOptionFrom = (list, def) => {
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item[0]) return item[1];
  }

  return def;
}

export default chooseOptionFrom;

