
import chooseOptionFrom from "@/util/chooseOptionFrom";

const Text = ({ 
  children, 
  className='',
  size='',
  small='',
  medium='',
  large='',
  italic='',
  inline='',
  bold='',
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

  return (
    <p 
    className={`custom-text leading-6 ${textSize} text-white ${textDisplay} items-center gap-2 ${textFont} ${textStyle} ${className}`}>
      {children}
    </p>
  );
};

export default Text;

