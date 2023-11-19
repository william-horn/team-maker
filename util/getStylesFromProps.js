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
  }
}

const getStylesFromProps = (options, defaults, propData={}) => {
  const {
    bold,
    italic,
    inline,
  
    size,
    large,
    medium,
    small,
    xsmall,
  } = options

  const sizes = {
    [large]: ['text-lg', 'large'], 
    [medium]: ['text-md', 'medium'], 
    [small]: ['text-sm', 'small'], 
    [xsmall]: ['text-xs', 'xsmall']
  }

  return {
    size: size || sizes[true] ? (propData.sizes ? propData.sizes[sizes[true][1]] : sizes[true][0]) : defaults.size || 'text-xs',
    weight: styles.bold[bold] || defaults.weight || styles.bold[false],
    style: styles.italic[italic] || defaults.style || styles.italic[false],
    display: styles.inline[inline] ? (propData.inline ? propData.inline[inline] : styles.inline[inline]) : defaults.display || styles.inline[false]
  }
}

export default getStylesFromProps;

