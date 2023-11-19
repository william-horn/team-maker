import getStylesFromProps from "@/util/getStylesFromProps";

const Heading = ({ 
  children, 
  className='',
  ...rest
}) => {
  const {
    size: textSize,
    style: textStyle, 
    weight: textWeight, 
    display: textDisplay,
  } = getStylesFromProps({
    ...rest, 
  }, {
    size: 'text-lg',
    weight: 'font-bold'
  });   

  // todo: adapt line height to text size

  return (
    <h2 
    className={`custom-text leading-6 py-3 ${textSize} text-white ${textDisplay} ${textWeight} ${textStyle} ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;

