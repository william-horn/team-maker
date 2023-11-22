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

/*
  React component starts
*/
const Button = function({
  children,

  onClick=emptyFunc,
  onMouseEnter=emptyFunc,
  onMouseLeave=emptyFunc,
  
  activateOnRender,
  leftIcon,
  rightIcon,
  href,

  size='text-sm',
  innerPadding='py-2 px-1',
  outerPadding='px-2',

  ...rest
  // noBackground,
  // bold,
  // italic,
  // inline,
}) {
  // button mode
  const mode = href ? 'link' : 'button';

  const styles = getStylesFromProps({
    ...rest

  }, {
    // defaults
    inline: false,
    bold: false,
    italic: false,
    noBackground: false,
    underline: false,

  }, {
    // custom props
    inline: {
      [true]: 'inline-flex',
      [false]: 'flex'
    }
  })

  /*
    Styles for component and sub-components
  */
  const className = {
    self: `${size} ${outerPadding} ${styles.underline} ${styles.noBackground || 'bg-[#3f3f3f] hover:bg-[#525252]'} ${styles.bold} ${styles.italic} ${styles.inline} custom-button items-center align-middle text-white transition-all rounded w-fit`,
    inner: { self: `${innerPadding}` },

    leftIcon: {
      width: 'w-5',
      height: 'h-5',
      filter: 'invert'
    },

    rightIcon: {
      width: 'w-5',
      height: 'h-5',
      filter: 'invert',
    },
  }

  // Create button state
  const [_mutableProps, _setMutableProps] = useState({
    selected: false,
  })

  // Button data holding state setter and getter. Gets passes to handler callbacks
  const buttonData = {
    // updateState: function(query, onUpdateFinish) {
    //   _setMutableProps(prev => {
    //     const newState = {...prev, ...query};

    //     this.state = newState;
    //     onUpdateFinish(newState);
        
    //     return newState;
    //   })
    // },

    // state: _mutableProps
  }

  // Handle page mount events
  useEffect(() => {
    if (activateOnRender) onClick(buttonData)
  }, [])

  const renderIcon = (icon, className) => {
    if (icon) {
      return (
        <Icon 
        utility 
        src={icon}
        filter={className.filter}
        width={className.width}
        height={className.height}
        />
      );
    }
  }

  /* 
    Render the content inside the <button> element
  */
  const renderButtonContent = () => <>
    {renderIcon(leftIcon, className.leftIcon)}

    {/* 
      previously had:  
        *text-left
        *rounded
        *flex-auto
    */}
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
        onMouseEnter={() => onMouseEnter(buttonData)} 
        onMouseLeave={() => onMouseLeave(buttonData)}
        onClick={() => onClick(buttonData)}
        >
          {renderButtonContent()}
        </button>
  )
};

export default Button;