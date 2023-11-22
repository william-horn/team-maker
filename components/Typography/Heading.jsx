import getStylesFromProps from "@/util/getStylesFromProps";

const Heading = ({ 
  children, 
  size='text-xl',
  ...rest
}) => {
  const styles = getStylesFromProps({
    ...rest

  }, {
    // defaults
    inline: false,
    bold: true,
    italic: false,
    noBackground: false,
    underline: false,

  });

  // todo: adapt line height to text size

  return (
    <h2 
    className={`${styles.inline} ${styles.bold} ${styles.italic} ${size} ${styles.underline} custom-text leading-6 py-3 text-white`}>
      {children}
    </h2>
  );
};

export default Heading;

