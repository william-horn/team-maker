const stringIsEmpty = str => {
  return str.match(/\S/g) === null;
}

export default stringIsEmpty;