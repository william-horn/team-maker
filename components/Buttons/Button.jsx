"use client";

import { 
  useEffect, 
  useState 
} from "react";

const Button = ({
  children,
  onClick=() => {},
  activateOnRender,
}) => {

  /*  
    Create an object of mutable component props. This will group the props together
    so we can change them later.
  */ 
  const [_mutableProps, _setMutableProps] = useState({
    selected: false
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
    buttonState: {
      ..._mutableProps,
      update: query => _setMutableProps(prev => ({...prev, ...query}))
    },
  }

  /*
    The 'processClick' function is a proxy for calling the 'onClick' function, so we
    don't need to manually pass the 'clickReport' object to 'onClick' on every event activation.
  */
  const processClick = () => {
    console.log("system click")
    onClick(clickReport)
  }

  /*
    This 'useEffect' is responsible for triggering the 'onClick' event on the initial page
    render, if that option is being used.
  */ 
  useEffect(() => {
    if (activateOnRender) processClick()
  }, [])


  /* 
    Render the content inside the <button> element
  */
  const renderButtonContent = () => <>
    <span className="flex-auto p-2 text-left rounded text-md">
      {children}
    </span>
  </>

  return (
    <button 
    className="relative flex items-center px-2 m-2 text-white transition-all bg-black rounded custom-button min-w-fit"
    onClick={processClick}
    >
      {renderButtonContent()}
    </button>
  );
};

export default Button;