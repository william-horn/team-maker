import stringIsEmpty from "./stringIsEmpty";

const styles = {
  bold: {
    [true]: 'font-bold',
    [false]: 'font-normal',
  },

  italic: {
    [true]: 'italic',
    [false]: 'not-italic',
  },

  inline: {
    [true]: 'inline',
    [false]: 'block'
  },

  noBackground: {
    [true]: "bg-opacity-0",
    [false]: false
  },

  underline: {
    [true]: "underline",
    [false]: "none",
  }
}

const getStylesFromProps = (props, defaults={}, customStyles={}) => {
  const compiledProps = {...defaults, ...props}
  const finalProps = {};
  const notFound = "[not found]";

  for (let key in compiledProps) {
    const value = compiledProps[key];
    const style = styles[key];
    const customStyle = customStyles[key];

    if (customStyle) {
      finalProps[key] = customStyle[value];
    } else if (style) {
      finalProps[key] = style[value];
    }

    if (finalProps[key] === undefined) {
      finalProps[key] = notFound;
    }
  }

  return finalProps;
}

export default getStylesFromProps;

