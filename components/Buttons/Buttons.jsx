/*
  @author: William J. Horn
  @date: 12/15/2023 - [ongoing]

  @description:
    Buttons.jsx is a resource I developed to give me some handy dandy buttons. They're designed
    to be responsive, work in groups/dropdown menus, support icons, and much more.
*/

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
import { useDropdownSelectionContext } from "@/providers/DropdownSelectionProvider";

// ============================ //
// ----- COMPONENT STYLES ----- //
// ============================ //
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

// ============================= //
// ----- UTILITY FUNCTIONS ----- //
// ============================= //
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
const useButtonController = (buttonProps) => {
  const buttonGroupContext = useButtonGroupContext();
  const dropdownSelectionContext = useDropdownSelectionContext();

  // TODO:
  /*
    Find way to generalize this function a bit more in the future. Lots of similarities between
    button group context and dropdown selection context. Look into later.
  */

  buttonProps = (buttonGroupContext && !buttonProps.ignoreContext)
    // merge remaining button group props
    ? {...buttonGroupContext.rest, ...buttonProps}
    : (dropdownSelectionContext && !buttonProps.ignoreContext)

      // merge remaining dropdown selection menu props
      ? {...dropdownSelectionContext.rest, ...buttonProps}
      : buttonProps;


  // pull out common props
  const {
    importedClassName,
    importedState,

    leftIcon,
    rightIcon,
    rightIconSelected,
    leftIconSelected,
    rightIconHovered,
    leftIconHovered,

    ignoreContext,
    ...restButtonProps
  } = buttonProps;

  // ============================================ //
  // ------------ DROPDOWN SELECTION ------------ // 
  // ============================================ //
  if (dropdownSelectionContext && !ignoreContext) {

    const {
      menuOpen: group_menuOpen,
      setMenuOpen: group_setMenuOpen,
      selectedId: group_selectedId,
      setSelectedId: group_setSelectedId,
      className: group_className,
      registeredIds,
      selectedItemData,
      state: group_state,
    } = dropdownSelectionContext;

    const {
      onClick=() => true,
      ...restButtonData
    } = restButtonProps;

    if (!buttonProps.id) {
      throw Error("DropdownSelection members must be given an 'id' prop");
    }

    buttonProps.importedState = {
      __dropdownSelected: group_selectedId === buttonProps.id,
      ...group_state,
      ...importedState
    }

    const buttonData = {
      ...restButtonData,
      inDropdown: true,
      state: buttonProps.importedState
    }

    buttonProps.importedClassName = mergeClass(
      group_className.menuItems,
      importedClassName,
    );

    if (buttonProps.importedState.__dropdownSelected) {
      selectedItemData.current[buttonProps.id] = buttonData;
    } else {
      delete selectedItemData.current[buttonProps.id];
    }

    registeredIds.current[buttonProps.id] = buttonData;

    buttonProps.onClick = () => {
      if (!buttonProps.importedState.__dropdownSelected) {
        group_setSelectedId(buttonProps.id);
        group_setMenuOpen(false);
      }
    }

    const { 
      id, 
      value, 
      ...restProps 
    } = restButtonData;

    buttonProps.restArgs = restProps;


  // ============================================== //
  // ---------------- BUTTON GROUP ---------------- // 
  // ============================================== //
  } else if (buttonGroupContext && !ignoreContext) {

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
    } = buttonGroupContext;

    const {
      // this default is unique to button being used as button group member, so define it here
      // ! i don't think we need this anymore due to 'processClick' being used
      onClick=() => true,

      // extended props when in button group
      onSelect=() => true,
      onUnselect=() => true,

      // id,
      // value
      ...restButtonData
    } = restButtonProps;

    // button must have an 'id' prop if used inside a button group
    if (!buttonProps.id) {
      throw Error("ButtonGroup components must be given an 'id' prop");
    }

    /*
      this is the main state object for the button. state will cascade starting from 
      the button group provider, then the generated state, then finally any defined
      state prop passed directly in the button.
    */
    buttonProps.importedState = {
      //! move this to first position if you want to manually over-write state by passing state props
      //! this was placed here so stateful buttons would behave expectedly in button groups
      //? pretty sure the only draw-back to this is duplicating the button id in the button group
      //? activeId list when __selected is first.
      __groupSelected: findActiveId(buttonProps.id).found,

      ...group_state,
      ...importedState,
    }

    // button data holds all remaining button attributes, along with the main state object
    const buttonData = {
      ...restButtonData,
      inGroup: true,
      state: buttonProps.importedState
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
    if (buttonProps.importedState.__groupSelected) {
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
      if (onClick(...args)) group_onClick(...args);
    }
  
    buttonProps.onClick = () => {
      const selected = !buttonProps.importedState.__groupSelected;
  
      if (selectionLimit > -1 && activeIds.length >= selectionLimit && selected) {
        if (unselectLastChoice) {
          const unselectedButtonId = activeIds[activeIds.length - 1];
  
          if (unselectedButtonId !== buttonProps.id) {
            const unselectedButtonData = groupButtonData.current[unselectedButtonId];
            unselectedButtonData.state.__groupSelected = false;
            
            fireOnUnselect(unselectedButtonData);
            updateActiveIds(unselectedButtonId, unselectedButtonData.state.__groupSelected);
          }
  
        } else {

          onSelectionLimitReached(buttonData);
          return;
        }
      }

      buttonProps.importedState.__groupSelected = selected;
      fireOnClick(buttonData);
      // console.log("selection: ", onSelect, onUnselect);
  
      if (selected) {
        fireOnSelect(buttonData);
      } else {
        fireOnUnselect(buttonData);
      }
  
      updateActiveIds(buttonData.id, selected);
    }

    /*
      extract remaining final props from buttonProps to be passed
      as element attributes back to the component.
    */
    const { 
      id, 
      value, 
      ...restProps 
    } = restButtonData;

    buttonProps.restArgs = restProps;

  } else {

    // define defaults that are exclusive to button when not in button group
    buttonProps = {
      onClick: emptyFunc,
      onSelect: emptyFunc,
      onUnselect: emptyFunc,
      ...buttonProps
    }

    // extract button data from props, ignoring all destructured variables
    //* note: this is optional. this only removes data that would be included in the buttonData object.
    const {
      onSelect,
      onClick,
      onUnselect,

      ...buttonData
    } = restButtonProps;

    //* note: this is less-optional, as it affects what data will be visible in the attributes
    const {
      id,
      value,
      ...restProps
    } = buttonData;

    buttonProps.restArgs = restProps;

    /*
      if button was passed some state, then create some button data to
      return back to the caller
    */
   
    buttonProps.onClick = () => onClick({
      state: importedState,
      ...buttonData,
      inGroup: false,
    });
  }

  const state = buttonProps.importedState;

  buttonProps.activeLeftIcon = ((state.__selected || state.__groupSelected) && leftIconSelected) 
    || (state.__hovered && leftIconHovered)
    || leftIcon;

  buttonProps.activeRightIcon = ((state.__selected || state.__groupSelected) && rightIconSelected) 
    || (state.__hovered && rightIconHovered) 
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
    onClick={buttonController.onClick}
    {...buttonController.restArgs}>
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

  * note: every STATEFUL component using a STATELESS component as a 
  * template should have some sort of 'processBlah()' callback declared 
  * inside the body of the component.
  
  This is so you can handle the state switching logic, and fire your own callbacks
  depending on what state the component is in. This will also allow you to differentiate 
  between a button inside a button group, and a button by itself (using buttonData.inGroup) 
*/
export const StatefulButton = function({
  children,

  // onClick=emptyFunc,
  // onSelect=emptyFunc,
  // onUnselect=emptyFunc,

  className: importedClassName,
  defaultSelect=false,
  ...rest
}) {
  const [selected, setSelected] = useState(defaultSelect);
  const [hovered, setHovered] = useState(false);

  const processClick = (buttonData) => {
    const isSelected = !selected;
    const { onClick, onSelect, onUnselect } = rest;

    if (!buttonData.inGroup) {
      buttonData.state.__selected = isSelected;

      if (isSelected) {
        if (onSelect) onSelect(buttonData);
      } else {
        if (onUnselect) onUnselect(buttonData);
      }
    }

    /*
      * ideally, 'setSelected(isSelected)' should go inside the 'inGroup' if statement above,
      * since we really don't need to update the local state when in a button group.
      * however, in some cases, you may want to use both states. so it can be left here 
      * until that need is demanded.
    */
    setSelected(isSelected);

    if (onClick) return onClick(buttonData);
    return true;
  }
  
  return (
    <StatelessButton
    className={importedClassName}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={processClick}
    state={{__hovered: hovered, __selected: selected}}
    {...rest}>
      {children}
    </StatelessButton>
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
    onClick={buttonController.onClick}
    {...buttonController.restArgs}>
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
  className: importedClassName,
  // state: importedState={},
  href,

  ...rest
}) {
  const urlPathname = usePathname();
  const selected = urlPathname === href;

  const [hovered, setHovered] = useState(false);

  const processClick = (buttonData) => {
    const { onClick } = rest;

    // defer click callback to original handler
    if (onClick) return onClick(buttonData);

    // return true so callback triggers groupClick callback
    return true;
  }

  return (
    <StatelessLinkButton
    onClick={processClick}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    href={href}
    className={importedClassName}
    state={{__hovered: hovered, __selected: selected}}
    {...rest}
    >
      {children}
    </StatelessLinkButton>
  )
};