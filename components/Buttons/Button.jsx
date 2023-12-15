"use client";

/*
  TODO:

  * Button State
    Button component currently uses state even when the user does not need a stateful button or
    is importing their own state for the button to use. React does not recommend conditional logic 
    for React hooks, so that is not an option. Create a clone of this button component that doesn't
    use state, and use that as the template for this Button allowing for the option to use either.

  * Stateful Button Side-Icons
    Button component currently does NOT have the option to change side icons
    based on button state, unlike it's <ButtonGroup.Button> counterpart. In the 
    future, create an option for this in props for the Button component.
*/

/*
  File imports
*/
import mergeClass from "@/util/mergeClass";
// import { twMerge } from "tailwind-merge";
import Icon from "../Graphics/Icon";
import Link from "next/link";
// import getStylesFromProps from "@/util/getStylesFromProps";
import emptyFunc from "@/util/emptyFunc";

import { 
  useEffect, 
  useState 
} from "react";


/*
  React component starts
*/
const Button = function({
  children,
  className: importedClassName={},

  onClick=emptyFunc,
  onMouseEnter=emptyFunc,
  onMouseLeave=emptyFunc,
  
  state,
  // preset,
  activateOnMount=false,
  leftIcon,
  rightIcon,
  href,

  ...rest
}) {

  // Create button state
  const [_isSelected, _setSelected] = useState(false);

  let className = {
    self: "bg-button-primary text-white inline-flex items-center align-middle rounded transition-all w-fit text-sm px-1 hover:bg-button-hover-primary",

    inner: {
      self: "py-2 px-1",
    },

    leftIcon: {
      self: "",
      image: {
        self: "invert",
      }
    },

    rightIcon: {
      self: "",
      image: {
        self: "invert",
      }
    },
  }

  className = mergeClass(
    className, 
    importedClassName,
    state || { _isSelected }
  );

  // Button data holding state setter and getter. Gets passes to handler callbacks
  const buttonData = {
    isSelected: _isSelected,
  };

  const processClick = () => {
    buttonData.isSelected = !buttonData.isSelected;
    _setSelected(buttonData.isSelected);

    onClick(state || buttonData);
  }

  // Handle page mount events
  useEffect(() => {
    if (activateOnMount) processClick();
  }, [])

  const renderIcon = (icon, iconClass) => {
    if (icon) {
      return (
        <Icon 
        className={iconClass}
        utility 
        src={icon}
        />
      );
    }
  }

  const renderButtonContent = () => <>
    {renderIcon(leftIcon || className.leftIcon.src, className.leftIcon)}

    <span className={className.inner.self}>
      {children}
    </span>

    {renderIcon(rightIcon || className.rightIcon.src, className.rightIcon)}
  </>
  
  return (
    href
      ? <Link className={className.self} href={href} {...rest}>
          {renderButtonContent()}
        </Link>
      : <button 
        className={className.self}
        onMouseEnter={() => onMouseEnter()} 
        onMouseLeave={() => onMouseLeave()}
        onClick={processClick}
        {...rest}>
          {renderButtonContent()}
        </button>
  )
};

export default Button;