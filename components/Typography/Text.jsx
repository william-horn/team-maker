
import getStylesFromProps from "@/util/getStylesFromProps";

const Text = ({ 
  children, 
  className='',
  ...rest
  // size='',
  // small='',
  // medium='',
  // large='',
  // italic='',
  // inline='',
  // bold='',
}) => {
  const {
    size: textSize,
    style: textStyle, 
    weight: textWeight, 
    display: textDisplay,
  } = getStylesFromProps({
    ...rest, 
  }, {
    size: 'text-sm',
  });   

  // todo: adapt line height to text size

  return (
    <p 
    className={`custom-text leading-6 ${textSize} text-white ${textDisplay} ${textWeight} ${textStyle} ${className}`}>
      {children}
    </p>
  );
};

export default Text;

