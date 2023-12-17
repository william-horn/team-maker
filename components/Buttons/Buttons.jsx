"use client";

/*
  File imports
*/
import React, { useEffect, useState } from "react";
import mergeClass from "@/util/mergeClass";
import Icon from "../Graphics/Icon";
import Link from "next/link";
import emptyFunc from "@/util/emptyFunc";
import { usePathname } from "next/navigation";
import { useButtonGroupContext } from "@/providers/ButtonGroupProvider";

// ---------------------------- //
// ----- COMPONENT STYLES ----- //
// ---------------------------- //
const className = {
  // the outer-most element of the button, or "master element"
  self: "bg-button-primary text-primary inline-flex items-center align-middle rounded transition-all w-fit text-sm px-1 hover:bg-button-hover-primary",

  // the inner-container sitting between the outer-layer and button content
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

  __selected: {
    self: "bg-green-500 hover:bg-green-600"
  }
}

// ----------------------------- //
// ----- UTILITY FUNCTIONS ----- //
// ----------------------------- //
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

const renderButtonContent = (leftIcon, rightIcon, className, children) => <>
  {renderIcon(className.leftIcon.src || leftIcon, className.leftIcon)}

  <span className={className.inner.self}>
    {children}
  </span>

  {renderIcon(className.rightIcon.src || rightIcon, className.rightIcon)}
</>

// ----------------------------------- //
// -------- BUTTON CONTROLLER -------- //
// ----------------------------------- //
const useButtonController = (buttonProps, callbacks={}) => {
  const buttonGroupContext = useButtonGroupContext();

  if (buttonGroupContext) {

    // extract all shared functionality from group button provider
    const {
      onClick: group_onClick,
      findActiveId,
      updateActiveIds,
      onSelectionLimitReached,
      unselectLastChoice,
      activeIds,
      groupButtonData,
      selectionLimit,
      onSelect: group_onSelect,
      onUnselect: group_onUnselect,
      className: group_className,
      state: group_state,
      registeredIds,
      rest: group_args,
    } = buttonGroupContext;

    /*
      combine left over props from button group provider, with current props 
      directly from button component
    */
    buttonProps = {...group_args, ...buttonProps};

    const {
      // defaults already defined - base props
      importedClassName,
      importedState,

      // this default is unique to button being used as button group member, so define it here
      onClick=() => true,

      // extended props when in button group
      onSelect=() => true,
      onUnselect=() => true,

      // defining these to pull them out of button data object
      //* warning: this solution won't scale up well, but it's fine for now
      leftIcon,
      rightIcon,
      leftIconSelected,
      rightIconSelected,

      // id,
      // value
      ...remainingButtonData
    } = buttonProps;

    /*
      this is the main state object for the button. state will cascade starting from 
      the button group provider, then the generated state, then finally any defined
      state prop passed directly in the button.
    */
    buttonProps.importedState = {
      ...group_state,
      ...importedState,

      //! move this to first position if you want to manually over-write state by passing state props
      //! this was placed here so stateful buttons would behave expectedly in button groups
      __selected: findActiveId(buttonProps.id).found,
    }

    // button data holds all remaining button attributes, along with the main state object
    const buttonData = {
      ...remainingButtonData,
      inGroup: true,
      state: buttonProps.importedState
    }

    // button must have an 'id' prop if used inside a button group
    if (!buttonProps.id) {
      throw Error("ButtonGroup components must be given an 'id' prop");
    }

    // merge classes defined in button group provider with classes
    // passed directly to the button component
    buttonProps.importedClassName = mergeClass(
      group_className.buttons, 
      importedClassName
    )

    /*
      update the button group's button data object for storing
      information about all active buttons
    */
    if (buttonProps.importedState.__selected) {
      groupButtonData.current[buttonProps.id] = buttonData;
    } else {
      delete groupButtonData.current[buttonProps.id];
    }

    /*
      add this button to the set of registeredIds in the button group provider,
      so we can keep button ids in sync
    */
    registeredIds.current[buttonProps.id] = buttonData;

    /*
      short-hand functions for firing button group callbacks and
      direct button events.

      * note: you must return 'true' from within a callback given directly to the button 
      * in order for the callback to bubble back up to the button group callback.
    */
    const fireOnSelect = (...args) => {
      if (onSelect(...args)) group_onSelect(...args);
    }
  
    const fireOnUnselect = (...args) => {
      if (onUnselect(...args)) group_onUnselect(...args);
    }

    const fireOnClick = (...args) => {
      if (
        callbacks.__overrideClick 
          ? callbacks.__overrideClick(onClick, ...args) 
          : onClick(...args)
      ) {
        group_onClick(...args);
      }
    }
  
    buttonProps.onClick = () => {
      const selected = !buttonProps.importedState.__selected;
  
      if (selectionLimit > -1 && activeIds.length >= selectionLimit && selected) {
        if (unselectLastChoice) {
          const unselectedButtonId = activeIds[activeIds.length - 1];
  
          if (unselectedButtonId !== buttonProps.id) {
            const unselectedButtonData = groupButtonData.current[unselectedButtonId];
            unselectedButtonData.state.__selected = false;
            
            fireOnUnselect(unselectedButtonData);
            updateActiveIds(unselectedButtonId, unselectedButtonData.state.__selected);
          }
  
        } else {

          onSelectionLimitReached(buttonData);
          return;
        }
      }
  
      fireOnClick(buttonData);
  
      if (selected) {
        fireOnSelect(buttonData);
      } else {
        fireOnUnselect(buttonData);
      }
  
      buttonProps.importedState.__selected = selected;
      updateActiveIds(buttonData.id, selected);
    }
  } else {

    // define defaults that are exclusive to button when not in button group
    buttonProps = {
      onClick: emptyFunc,
      ...buttonProps
    }

    // switch out the 'onClick' callback with a custom one if provided.
    //* note: custom callback should still call the original 'onClick' somewhere
    if (callbacks.__overrideClick) {

      // extract button data from props, ignoring all destructured variables
      //* note: this may not scale up very well. the chaos as more props are added is O(n)
      //* suggestion: figure out a way to construct 'buttonData' as an object somewhere else
      const {
        importedClassName,
        onClick,
        importedState,
        leftIcon,
        rightIcon,
        rightIconSelected,
        leftIconSelected,
        ...buttonData
      } = buttonProps;

      buttonProps.onClick = () => callbacks.__overrideClick(onClick, {
        state: buttonProps.importedState,
        ...buttonData,
        inGroup: false,
      })
    }
  }

  const {
    importedState,
    leftIconSelected,
    rightIconSelected,
    leftIcon,
    rightIcon,
    leftIconHovered,
    rightIconHovered,
  } = buttonProps;

  buttonProps.activeLeftIcon = (importedState.__selected && leftIconSelected) 
    || (importedState.__hovered && leftIconHovered)
    || leftIcon;

  buttonProps.activeRightIcon = (importedState.__selected && rightIconSelected) 
    || (importedState.__hovered && rightIconHovered) 
    || rightIcon;

  return buttonProps;
}

/*
  ? Stateless Button Component

  Button component using all default styles but does not use any 
  react hooks.
*/
export const StatelessButton = function({
  children,
  className: importedClassName={},
  state: importedState={},
  // onClick=console.log,
  // onClick=emptyFunc,
  // onSelect: func,
  // onUnselect: func,
  // id,
  // value,
  ...rest
}) {
  const buttonController = useButtonController({ 
    importedClassName,
    importedState,
    ...rest 
  });

  const finalStyles = mergeClass(
    className,
    buttonController.importedClassName,
    buttonController.importedState
  );

  return (
    <button 
    className={finalStyles.self}
    onClick={buttonController.onClick}>
      {renderButtonContent(
        buttonController.activeLeftIcon,
        buttonController.activeRightIcon,
        finalStyles,
        children
      )}
    </button>
  )
};

/*
  ? Stateful Button Component

  Button component using all default styles but does not use any 
  react hooks.
*/
export const StatefulButton = function({
  children,
  className: importedClassName={},
  // onClick=console.log,
  defaultSelect=false,
  // state: importedState={},

  // leftIcon,
  // rightIcon,
  // leftIconSelected,
  // rightIconSelected,
  // leftIconHovered
  // rightIconHovered

  ...rest
}) {
  const [selected, setSelected] = useState(defaultSelect);
  const [hovered, setHovered] = useState(false);

  const buttonController = useButtonController({
    importedState: { 
      __selected: selected, 
      __locallySelected: selected,
      __hovered: hovered,
    },
    ...rest
  }, {

    /*
      * note: this will fire instead of the 'onClick' passed in props.
      * override callbacks passes the original 'onClick', and the computed button data
      * from the controller.
    */
    __overrideClick: (onClick, buttonData) => {
      const isSelected = !selected;

      // update locallySelected to current state
      buttonData.state.__locallySelected = isSelected;

      // if button is in a group, don't update the selected state
      if (!buttonData.inGroup) {
        buttonData.state.__selected = isSelected;
      }

      setSelected(isSelected);
      return onClick(buttonData);
    }
  });

  const finalStyles = mergeClass(
    className, 
    buttonController.importedClassName,
    buttonController.importedState,
  );
  
  return (
    <button 
    className={finalStyles.self}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={buttonController.onClick}>
      {renderButtonContent(
        buttonController.activeLeftIcon, 
        buttonController.activeRightIcon, 
        finalStyles, 
        children
      )}
    </button>
  )
};

/*
  ? Stateless Link Button Component

  Button with all default styles but redirects user instead
  of serving some dynamic functionality.
*/
export const StatelessLinkButton = function({
  children,
  className: importedClassName={},
  state: importedState={},
  href,

  ...rest
}) {
  const buttonController = useButtonController({
    importedClassName,
    importedState,
    ...rest
  });

  const finalStyles = mergeClass(
    className, 
    buttonController.importedClassName,
    buttonController.importedState
  );
  
  return (
    <Link 
    className={finalStyles.self} 
    href={href} 
    onClick={buttonController.onClick}>
      {renderButtonContent(
        buttonController.activeLeftIcon, 
        buttonController.activeRightIcon, 
        finalStyles, 
        children
      )}
    </Link>
  )
};


/*
  ? Stateful Link Button Component
*/
export const StatefulLinkButton = function({
  children,
  className: importedClassName={},
  state: importedState={},
  href,

  ...rest
}) {
  const urlPathname = usePathname();
  const selected = urlPathname === href;

  // const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  const buttonController = useButtonController({
    importedState: { 
      __selected: selected, 
      __hovered: hovered,
    },
    ...rest
  });

  const finalStyles = mergeClass(
    className, 
    buttonController.importedClassName,
    buttonController.importedState,
  );
  
  return (
    <Link 
    href={href}
    className={finalStyles.self}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={buttonController.onClick}>
      {renderButtonContent(
        buttonController.activeLeftIcon, 
        buttonController.activeRightIcon, 
        finalStyles, 
        children
      )}
    </Link>
  )
};