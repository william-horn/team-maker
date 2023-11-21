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

  size='sm',
  innerPadding='p-2',
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
    self: `text-${size} ${outerPadding} ${styles.noBackground || 'bg-[#3f3f3f]'} ${styles.bold} ${styles.italic} ${styles.inline} custom-button items-center align-middle text-white transition-all rounded w-fit`,
    inner: { self: `${innerPadding}` },

    leftIcon: {
      width: '5',
      height: '5',
      filter: 'invert'
    },

    rightIcon: {
      width: '5',
      height: '5',
      filter: 'invert',
    },
  }

  // Create button state
  const [_mutableProps, _setMutableProps] = useState({
    selected: false,
  })

  // Button data holding state setter and getter. Gets passes to handler callbacks
  const buttonData = {
    updateState: function(query, onUpdateFinish) {
      _setMutableProps(prev => {
        const newState = {...prev, ...query};

        this.state = newState;
        onUpdateFinish(newState);
        
        return newState;
      })
    },

    state: _mutableProps
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
        filter="invert"
        width="5"
        height="5"
        />
      );
    }
  }

  /* 
    Render the content inside the <button> element
  */
  const renderButtonContent = () => <>
    {renderIcon(leftIcon, className.leftIcon.self)}

    {/* 
      previously had:  
        *text-left
        *rounded
        *flex-auto
    */}
    <span className={className.inner.self}>
      {children}
    </span>

    {renderIcon(rightIcon, className.rightIcon.self)}
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