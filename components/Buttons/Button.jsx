"use client";

import Icon from "../Graphics/Icon";
import Link from "next/link";

import { 
  useEffect, 
  useState 
} from "react";

const Button = ({
  children,
  onClick=() => {},
  activateOnRender,
  leftIcon=false,
  rightIcon=false,
  href=false
}) => {

  if (typeof leftIcon === "string") leftIcon = { src: leftIcon };
  if (typeof rightIcon === "string") rightIcon = { src: rightIcon };

  /*  
    Create an object of mutable component props. This will group the props together
    so we can change them later.

    bg-[#3f3f3f] 
  */ 
  const [_mutableProps, _setMutableProps] = useState({
    self_className: "relative flex items-center px-2 text-white transition-all bg-[#3f3f3f] rounded custom-button min-w-fit w-fit text-sm",
    selected: false,
  })

  /*
    The 'clickReport' object holds methods and metadata that we can pass through the
    'onClick' callback function. 
    
    This object also holds the current state of the button component, along with 
    the setter function of said state. Therefore, we can mutate the button state with 
    code inside the button click event handler.

    *note:
    We should not have any state inside our button component named 'update', since that
    variable will be overwritten by the 'update()' setter function inside the 'buttonState' field.
  */
  const clickReport = {
    updateState: query => _setMutableProps(prev => ({...prev, ...query})),
    getState: () => ({ ..._mutableProps })
  }

  /*
    The 'processClick' function is a proxy for calling the 'onClick' function, so we
    don't need to manually pass the 'clickReport' object to 'onClick' on every event activation.
  */
  const processClick = () => {
    onClick(clickReport)
  }

  /*
    This 'useEffect' is responsible for triggering the 'onClick' event on the initial page
    render, if that option is being used.
  */ 
  useEffect(() => {
    if (activateOnRender) processClick(clickReport)
  }, [])


  const renderIcon = icon => {
    if (icon) {
      return (
        <Icon 
        utility 
        src={icon.src} 
        self_className={icon.self_className || "w-5 h-5 invert"}
        />
      );
    }
  }

  /* 
    Render the content inside the <button> element
  */
  const renderButtonContent = () => <>
    {renderIcon(leftIcon)}

    <span className="flex-auto p-2 text-left rounded text-md">
      {children}
    </span>

    {renderIcon(rightIcon)}
  </>

  return (
    href
      ? <Link className={_mutableProps.self_className} href={href}>
          {renderButtonContent()}
        </Link>
      : <button className={_mutableProps.self_className} onClick={processClick}>
          {renderButtonContent()}
        </button>
  );
};

export default Button;