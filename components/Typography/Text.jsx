
import getStylesFromProps from "@/util/getStylesFromProps";

const Text = ({ 
  children, 
  size='text-sm',

  ...rest
  // size='',
  // small='',
  // medium='',
  // large='',
  // italic='',
  // inline='',
  // bold='',
}) => {
  const styles = getStylesFromProps({
    ...rest

  }, {
    // defaults
    inline: false,
    bold: false,
    italic: false,
    noBackground: true,
    underline: false,

  }, {
    // inline: {
    //   [false]: 'block',
    //   [true]: 'inline-block'
    // }
  });

  // todo: adapt line height to text size

  return (
    <p 
    className={`${size} ${styles.inline} ${styles.bold} ${styles.italic} ${styles.noBackground || 'bg-black'} ${styles.underline} custom-text leading-6 text-white align-middle`}>
      {children}
    </p>
  );
};

export default Text;

