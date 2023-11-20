"use client";

import Icon from "../Graphics/Icon";
import Link from "next/link";
import getStylesFromProps from "@/util/getStylesFromProps";
import emptyFunc from "@/util/emptyFunc";

import { 
  useEffect, 
  useState 
} from "react";

const Button = ({
  children,

  onClick=emptyFunc,
  onMouseEnter=emptyFunc,
  onMouseLeave=emptyFunc,
  
  activateOnRender=false,
  leftIcon=false,
  rightIcon=false,
  href=false,

  ...rest
  // size='',
  // bold=false,
  // italic=false,
  // xsmall=true,
  // small=false,
  // medium=false,
  // large=false,
  // inline=false,
}) => {

  const {
    size: textSize,
    style: textStyle, // italic, etc
    weight: textWeight, // bold, etc
    display: textDisplay,
    
  } = getStylesFromProps({
    // config
    ...rest, 
  }, {
    
    // defaults
    display: 'flex',
    size: 'text-xs'
  }, {

    // custom prop rules
    inline: { [true]: 'inline-flex', [false]: 'flex' },
  });   

  // Convert icon props to correct format
  if (typeof leftIcon === "string") leftIcon = { src: leftIcon };
  if (typeof rightIcon === "string") rightIcon = { src: rightIcon };

  // Create button state
  const [_mutableProps, _setMutableProps] = useState({
    selected: false,
  })

  const className = `custom-button align-middle px-2 m-1 text-white items-center transition-all bg-[#3f3f3f] rounded w-fit ${textDisplay} ${textStyle} ${textSize} ${textWeight}`

  // Button data holding state setter and getter. Gets passes to handler callbacks
  const buttonData = {
    updateState: function(query) {
      _setMutableProps(prev => {
        const newState = {...prev, ...query};
        this.state = newState;
        return newState;
      })
    },

    state: _mutableProps
  }

  // Handle page mount events
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
      ? <Link className={className} href={href}>
          {renderButtonContent()}
        </Link>
      : <button 
        onMouseEnter={() => onMouseEnter(buttonData)} 
        onMouseLeave={() => onMouseLeave(buttonData)}
        className={className} 
        onClick={() => onClick(buttonData)}
        >
          {renderButtonContent()}
        </button>
  )
};

export default Button;