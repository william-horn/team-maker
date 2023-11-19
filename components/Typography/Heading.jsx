import chooseOptionFrom from "@/util/chooseOptionFrom";

const Heading = ({ 
  children, 
  className='',
  size='',
  small='',
  medium='',
  large=true,
  italic='',
  inline='',
  bold=true,
}) => {
  const textSize = chooseOptionFrom([
    [size, size],
    [large, 'text-lg'],
    [medium, 'text-md'],
    [small, 'text-sm']
  ], 'text-sm');

  const textFont = chooseOptionFrom([[bold, 'font-bold']], 'font-normal');
  const textDisplay = chooseOptionFrom([[inline, 'inline']], 'block');
  const textStyle = chooseOptionFrom([[italic, 'italic']], 'not-italic') 

  // todo: adapt line height to text size

  return (
    <h2 
    className={`custom-text leading-6 py-3 ${textSize} text-white ${textDisplay} ${textFont} ${textStyle} ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;

