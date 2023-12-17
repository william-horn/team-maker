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
      ...rest
    }}>
      <div 
      ref={dropdownContainer}
      className={className.self} 
      onMouseLeave={toggleOnHover ? hideDropdown : emptyFunc}>
        <p>test</p>
        {children}
      </div>
    </DropdownSelectionProvider>
  );
}

export default DropdownSelection;