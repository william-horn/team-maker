"use client";

import { useState, useEffect, useRef } from "react";
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
  defaultValue,
  defaultSelect,
  // rightIconSelected,
  // leftIconSelected,
  // rightIconUnselected,
  // leftIconUnselected,
  state={},
  className: importedClassName={},
  ...rest
}) {

  // initialize state hooks
  const [selectedId, setSelectedId] = useState(defaultSelect);
  const [menuOpen, setMenuOpen] = useState(false);

  const selectedItemData = useRef({});
  const registeredIds = useRef({});
  const dropdownContainer = useRef(null);

  // all component styles
  let className = {
    self: "w-[200px] bg-button-primary rounded relative",

    dropButton: {
      self: "bg-transparent w-full justify-center",

      inner: {
        self: "w-full"
      },
      __selected: {
        self: "bg-transparent hover:bg-button-primary"
      }
    },

    menuItems: {
      self: "w-full bg-transparent justify-center",
      __dropdownSelected: {
        self: "bg-button-hover-primary hover:bg-button-hover-primary"
      }
    },

    outerList: {
      self: "absolute hidden w-full list-container p-2 min-h-[10rem] bg-button-primary z-[9999]"
    },

    innerList: {
      self: "flex-col overflow-y-scroll w-full flex"
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

  useEffect(() => {
    console.log("data: ", selectedItemData.current);
    console.log("total: ", registeredIds.current);
  });
  // <<

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
        leftIcon="/icons/search_icon.svg"
        rightIcon="/icons/search_icon.svg"
        className={className.dropButton}
        {...rest}
        >
          Select
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