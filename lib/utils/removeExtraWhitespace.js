const removeExtraWhitespace = str => {
  return str.trim().replace(/\s+/g, ' ')
}

export default removeExtraWhitespace;