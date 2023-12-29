"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useContextController } from "@/hooks/useContextController";
import Link from "next/link";
import Icon from "../Graphics/Icon";
import mergeClass from "@/lib/utils/mergeClass";

// ============================ //
// ----- COMPONENT STYLES ----- //
// ============================ //
const className = {
  // the outer-most element of the button, or "master element"
  self: "bg-button-primary text-primary inline-flex items-center align-middle rounded justify-center transition-colors w-fit text-sm px-1 hover:bg-button-hover-primary",

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

  __locallySelected: {
    self: "bg-green-500 hover:bg-green-600"
  }
}

// alias for button base class (in case another 'className' is used in a local namespace)
const baseClass = className;

// button style presets for ease of use
/*
  * note: button presets are functions to use the tailwind
  * class auto-complete feature
*/
export const ButtonPresets = {

  blendIn: ((className={
    self: "bg-transparent hover:bg-transparent rounded-none",

    inner: { 
      self: "p-0" 
    }
  }) => mergeClass(baseClass, className))(),

  sharpBorder: ((className={
    self: "rounded-none",
  }) => mergeClass(baseClass, className))(),

}

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

const renderButtonContent = (controller, className, children) => {
  const {
    leftIcon,
    rightIcon,
    rightIconSelected,
    leftIconSelected,
    rightIconHovered,
    leftIconHovered,
  } = controller;

  const state = controller.__getState();
  const selected = controller.__isSelected();
  const hovered = state.__hovered;

  const activeLeftIcon = (selected && leftIconSelected) 
    || (hovered && leftIconHovered)
    || leftIcon;

  const activeRightIcon = (selected && rightIconSelected) 
    || (hovered && rightIconHovered) 
    || rightIcon;

  return (
    <>
      {renderIcon(className.leftIcon.src || activeLeftIcon, className.leftIcon)}

      <span className={className.inner.self}>
        {children}
      </span>

      {renderIcon(className.rightIcon.src || activeRightIcon, className.rightIcon)}
    </>
  );
}

export const StatelessButton = function({
  children,
  className: importedClassName={},
  state: importedState={},
  ...rest
}) {

  const controller = useContextController({
    importedClassName,
    importedState,
    ...rest
  });

  const finalStyles = mergeClass(
    className,
    controller.importedClassName,
    controller.importedState
  );

  return (
    <button 
    className={finalStyles.self}
    onClick={() => controller.onClick()}
    {...controller.__getRestProps()}
    >
      {renderButtonContent(controller, finalStyles, children)}
    </button>
  )
};

export const StatefulButton = function({
  children,
  onClick: importedOnClick,
  defaultSelected=false,
  ...rest
}) {

  const [selected, setSelected] = useState(defaultSelected);
  const [hovered, setHovered] = useState(false);

  const onClick = (eventData) => {
    const isSelected = !selected;
    setSelected(isSelected);

    eventData.controller.__updateState({ __locallySelected: isSelected });
    if (importedOnClick) return importedOnClick(eventData);

    return true;
  }

  return (
    <StatelessButton
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={onClick}
    state={{ 
      __locallySelected: selected, 
      __hovered: hovered 
    }}
    {...rest}
    >
      {children}
    </StatelessButton>
  )
};

export const StatelessLink = function({
  children,
  className: importedClassName={},
  state: importedState={},
  href="/",
  ...rest
}) {

  const controller = useContextController({
    importedClassName,
    importedState,
    ...rest
  });

  const finalStyles = mergeClass(
    className,
    controller.importedClassName,
    controller.importedState
  );

  return (
    <Link 
    href={href}
    className={finalStyles.self}
    onClick={() => controller.onClick()}
    {...controller.__getRestProps()}
    >
      {renderButtonContent(controller, finalStyles, children)}
    </Link>
  )
};

export const StatefulLink = function({
  children,
  onClick: importedOnClick,
  ...rest
}) {
  const urlPathname = usePathname();
  const selected = urlPathname === rest.href;

  const [hovered, setHovered] = useState(false);

  const onClick = (eventData) => {
    if (importedOnClick) return importedOnClick(eventData);
    return true;
  }

  return (
    <StatelessLink
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={onClick}
    state={{ 
      __locallySelected: selected, 
      __hovered: hovered 
    }}
    {...rest}
    >
      {children}
    </StatelessLink>
  )
};