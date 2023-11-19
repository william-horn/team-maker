"use client";

import Icon from "../Graphics/Icon";
import Link from "next/link";
import chooseOptionFrom from "@/util/chooseOptionFrom";

import { 
  useEffect, 
  useState 
} from "react";

const Button = ({
  children,
  className='',
  onClick=() => {},
  onMouseEnter=() => {},
  onMouseLeave=() => {},
  activateOnRender,
  leftIcon=false,
  rightIcon=false,
  href=false,
  
  bold='',
  italic='',
  inline='',
  size='',
  xsmall='',
  small='',
  medium='',
  large='',
}) => {
  const textSize = chooseOptionFrom([
    [size, size],
    [large, 'text-lg'],
    [medium, 'text-md'],
    [small, 'text-sm'],
    [xsmall, 'text-xs'],
  ], 'text-xs');

  const textFont = chooseOptionFrom([[bold, 'font-bold']], 'font-normal');
  const textDisplay = chooseOptionFrom([[inline, 'inline-flex']], 'flex');
  const textStyle = chooseOptionFrom([[italic, 'italic']], 'not-italic') 

  if (typeof leftIcon === "string") leftIcon = { src: leftIcon };
  if (typeof rightIcon === "string") rightIcon = { src: rightIcon };

  /*  
    Create an object of mutable component props. This will group the props together
    so we can change them later.

    bg-[#3f3f3f] 
  */ 
  const [_mutableProps, _setMutableProps] = useState({
    className: `custom-button align-middle px-2 m-1 text-white items-center transition-all bg-[#3f3f3f] rounded w-fit ${textDisplay} ${textStyle} ${textSize} ${textFont}`,
    selected: false,
  })

  const finalClassName = `${_mutableProps.className} ${className}`;

  /*
    The 'buttonData' object holds methods and metadata that we can pass through the
    'onClick' callback function. 
    
    This object also holds the current state of the button component, along with 
    the setter function of said state. Therefore, we can mutate the button state with 
    code inside the button click event handler.

    *note:
    We should not have any state inside our button component named 'update', since that
    variable will be overwritten by the 'update()' setter function inside the 'buttonState' field.
  */
  const buttonData = {
    updateState: query => _setMutableProps(prev => ({...prev, ...query})),
    getState: () => ({ ..._mutableProps })
  }

  /*
    This 'useEffect' is responsible for triggering the 'onClick' event on the initial page
    render, if that option is being used.
  */ 
  useEffect(() => {
    if (activateOnRender) onClick(buttonData)
  }, [])


  const renderIcon = icon => {
    if (icon) {
      return (
        <Icon 
        utility 
        src={icon.src} 
        className={icon.className || `w-5 h-5 invert`}
        />
      );
    }
  }

  /* 
    Render the content inside the <button> element
  */
  const renderButtonContent = () => <>
    {renderIcon(leftIcon)}

    {/* 
      previously had:  
        *text-left
        *rounded
        *flex-auto
    */}
    <span className="p-2">
      {children}
    </span>

    {renderIcon(rightIcon)}
  </>
  
  return (
    href
      ? <Link className={finalClassName} href={href}>
          {renderButtonContent()}
        </Link>
      : <button 
        onMouseEnter={() => onMouseEnter(buttonData)} 
        onMouseLeave={() => onMouseLeave(buttonData)}
        className={finalClassName} 
        onClick={() => onClick(buttonData)}
        >
          {renderButtonContent()}
        </button>
  )
};

export default Button;