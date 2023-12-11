"use client";

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

//  custom-button items-center align-middle text-white transition-all rounded w-fit

// const className = {
//   "bg-color": "bg-[#3f3f3f]",
//   "text-color": "text-white",

//   "inline-flex": true,
//   "items-center": true,
//   "align-middle": true,
//   "transition-all": true,
//   "rounded": true,

//   "width": "w-fit",
//   "text-size": "text-sm",

//   inner: {
//     "padding": "py-2 px-2"
//   },

//   _leftIcon: {
//     "width": "w-7",
//     "height": "h-7",
//     image: {
//       "invert": true
//     }
//   },

//   _rightIcon: {
//     "width": "w-7",
//     "height": "h-7",
//     image: {
//       "invert": true
//     }
//   },
// }

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

  // ...rest
}) {

  // Create button state
  const [_isSelected, _setSelected] = useState(false);

  let className = {
    self: "bg-[#3f3f3f] text-white inline-flex items-center align-middle rounded w-fit text-sm px-1",

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

  // const styles = getStylesFromProps(
  //   className, 
  //   [preset, {...rest}],
  //   state || { _isSelected }
  // );

  // Button data holding state setter and getter. Gets passes to handler callbacks
  const buttonData = {
    isSelected: _isSelected,
  };

  const processClick = () => {
    buttonData.isSelected = !buttonData.isSelected;
    _setSelected(buttonData.isSelected);

    onClick(buttonData);
  }

  // Handle page mount events
  useEffect(() => {
    if (activateOnMount) processClick();
  }, [])

  const renderIcon = (icon, iconClass) => {
    if (icon) {
      return (
        <Icon 
        // preset={iconPreset}
        className={iconClass}
        utility 
        src={icon}
        />
      );
    }
  }

  const renderButtonContent = () => <>
    {renderIcon(leftIcon, className.leftIcon)}

    <span className={className.inner.self}>
      {children}
    </span>

    {renderIcon(rightIcon, className.rightIcon)}
  </>
  
  return (
    href
      ? <Link className={className.self} href={href}>
          {renderButtonContent()}
        </Link>
      : <button 
        className={className.self}
        onMouseEnter={() => onMouseEnter()} 
        onMouseLeave={() => onMouseLeave()}
        onClick={processClick}>
          {renderButtonContent()}
        </button>
  )
};

export default Button;