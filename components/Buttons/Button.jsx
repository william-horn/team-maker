"use client";

/*
  File imports
*/
import Icon from "../Graphics/Icon";
import Link from "next/link";
import getStylesFromProps from "@/util/getStylesFromProps";
import emptyFunc from "@/util/emptyFunc";

import { 
  useEffect, 
  useState 
} from "react";

//  custom-button items-center align-middle text-white transition-all rounded w-fit

const className = {
  "bg-color": "bg-[#3f3f3f]",
  "text-color": "text-white",

  "items-center": true,
  "align-middle": true,
  "transition-all": true,
  "rounded": true,

  "width": "w-fit",
  "text-size": "text-sm",

  inner: {
    "padding": "py-2 px-1"
  }
}

/*
  React component starts
*/
const Button = function({
  children,

  onClick=emptyFunc,
  onMouseEnter=emptyFunc,
  onMouseLeave=emptyFunc,
  
  state,
  preset,
  activateOnRender,
  leftIcon,
  rightIcon,
  href,

  ...rest
}) {

  // Create button state
  const [_isSelected, _setSelected] = state ? [state._isSelected, emptyFunc] : useState(false);

  const styles = getStylesFromProps(
    className, 
    preset || {...rest},
    state || { _isSelected }
  );

  // Button data holding state setter and getter. Gets passes to handler callbacks
  const buttonData = {
    isSelected: _isSelected,
  };

  const processClick = () => {
    
    if (!state) {
      buttonData.isSelected = !buttonData.isSelected;
      _setSelected(buttonData.isSelected);

      onClick(buttonData);

    } else {

      onClick(state);
    }
  }

  // Handle page mount events
  useEffect(() => {
    if (activateOnRender) processClick();
  }, [])

  const renderIcon = (icon) => {
    if (icon) {
      return (
        <Icon 
        utility 
        src={icon}
        />
      );
    }
  }

  const renderButtonContent = () => <>
    {renderIcon(leftIcon)}

    <span className={styles.inner.self}>
      {children}
    </span>

    {renderIcon(rightIcon)}
  </>
  
  return (
    href
      ? <Link className={styles.self} href={href}>
          {renderButtonContent()}
        </Link>
      : <button 
        className={styles.self}
        onMouseEnter={() => onMouseEnter(buttonData)} 
        onMouseLeave={() => onMouseLeave(buttonData)}
        onClick={processClick}>
          {renderButtonContent()}
        </button>
  )
};

export default Button;