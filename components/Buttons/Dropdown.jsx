"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import DropdownSelectionProvider from "@/providers/DropdownSelectionProvider";
import mergeClass from "@/util/mergeClass";
import emptyFunc from "@/util/emptyFunc";
import { StatelessButton } from "./Buttons";

const DropdownSelection = function({
  children,
  hideMenuOnBlur=true,
  toggleOnHover=false,
  toggleOnClick=true,
  placeholder="Select an Option",
  defaultData={},
  // rightIconSelected,
  // leftIconSelected,
  // rightIconUnselected,
  // leftIconUnselected,
  state={},
  className: importedClassName={},
  ...rest
}) {

  /*
    TODO:

    Find better way to set default selected menu item. The entire component should
    ideally render twice - once to load in all the data, and then again to 
    update the main component with the default data.

    Tried using 'useLayoutEffect()' to wait for data to load in before causing a re-paint,
    but the effect was the same since we still have no default content to render in the
    meantime.
  */

  // initialize state hooks
  const [selectedId, setSelectedId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  // const [firstRender, setFirstRender] = useState(false);

  const selectedItemData = useRef(defaultData);
  const registeredIds = useRef({});
  const dropdownContainer = useRef(null);

  // all component styles
  let className = {
    self: "w-[200px] bg-button-primary rounded relative hover:bg-button-hover-primary",

    dropButton: {
      self: "w-full justify-center",

      inner: {
        self: "w-full"
      },

      __selected: {
        self: "rounded-b-none bg-button-primary hover:bg-button-hover-primary"
      }
    },

    menuItems: {
      self: "w-full bg-transparent justify-center",
      __dropdownSelected: {
        self: "bg-button-hover-primary hover:bg-button-hover-primary"
      }
    },

    outerList: {
      self: "absolute hidden w-full list-container p-2 min-h-[5rem] bg-button-primary z-[9999] rounded-b"
    },

    innerList: {
      self: "flex-col w-full flex"
    },

    __selected: {
      outerList: {
        self: "flex"
      }
    }
  }

  className = mergeClass(
    className,
    importedClassName,
    { __selected: menuOpen }
  );

  const onMenuClick = () => {
    if (toggleOnClick) {
      setMenuOpen(!menuOpen);
    }
  }

  const showDropdown = () => setMenuOpen(true);
  const hideDropdown = () => setMenuOpen(false);

  // >> This logic is required for hiding the dropdown when focus is lost since "onBlur" fires before click events
  const onDropdownBlur = (event) => {
    if (!dropdownContainer.current.contains(event.target) && hideMenuOnBlur) {
      hideDropdown();
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", onDropdownBlur);
    return () => window.removeEventListener("mousedown", onDropdownBlur);
  }, []);
  // <<

  console.log("menu open: ", menuOpen);

  // useEffect(() => {
  //   console.log("selected: ", selectedId);
  //   console.log("registered: ", registeredIds.current);
  //   console.log("active data: ", selectedItemData.current);
  // });

  return (
    <DropdownSelectionProvider
    value={{
      selectedId,
      setSelectedId,
      menuOpen,
      setMenuOpen,
      className,
      selectedItemData,
      registeredIds,
      state,
      ...rest
    }}>
      <div 
      ref={dropdownContainer}
      className={className.self}
      onMouseLeave={toggleOnHover ? hideDropdown : emptyFunc}>
        <StatelessButton
        ignoreContext
        onClick={onMenuClick}
        onMouseEnter={toggleOnHover ? showDropdown : emptyFunc}
        state={{__selected: menuOpen}}
        className={className.dropButton}
        {...rest}
        >
          { selectedItemData.current.text || placeholder }
        </StatelessButton>

        <div className={className.outerList.self}>
          <div className={className.innerList.self}>
            {children}
          </div>
        </div>
      </div>
    </DropdownSelectionProvider>
  );
}

export default DropdownSelection;