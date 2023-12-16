"use client";

import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import DropdownProvider from "@/providers/DropdownProvider";
import { useDropdownContext } from "@/providers/DropdownProvider";
import mergeClass from "@/util/mergeClass";
import emptyFunc from "@/util/emptyFunc";

const DropdownItem = function({
  children,
  id,
  href,
  className: importedClassName,
  ...rest
}) {
  const {
    _menuOpen: group_menuOpen,
    _setMenuOpen: group_setMenuOpen,
    _itemSelected: group_itemSelected,
    _setItemSelected: group_setItemSelected,
    itemData: group_itemData,
    mode: group_mode,
    className: group_className,
  } = useDropdownContext();

  const itemData = group_itemData[id];

  if (!itemData) {
    throw Error("Item data does not exist for id \"" + id + "\"");
  } else if (href && group_mode !== "weblink") {
    throw Error("href can only be used in DropdownItem components if Dropdown mode is set to \"weblink\"");
  }

  const isSelected = group_itemSelected.id === id;
  const className = mergeClass(group_className.list.buttons, importedClassName);

  const onItemSelected = () => {
    if (!isSelected) {
      group_setItemSelected(itemData);
      group_setMenuOpen(false);
    }
  }

  const renderButtonItem = () => {
    switch (group_mode) {
      case "select":
        return (
          <Button 
          onClick={onItemSelected}
          state={{ _isSelected: isSelected }}
          className={className}
          {...rest}>
            {children}
          </Button>
        );

      case "weblink":
        return (
          <Button 
          className={className}
          href={href}
          {...rest}>
            {children}
          </Button>
        );
    }
  }

  return renderButtonItem();
}

const Dropdown = function({
  mode="select",
  itemData={},
  children,
  hideMenuOnBlur=true,
  toggleOnHover=false,
  toggleOnClick=true,
  placeholder="Select an Option",
  defaultValue,
  defaultSelect,
  rightIconSelected,
  leftIconSelected,
  rightIconUnselected,
  leftIconUnselected,
  className: importedClassName={}
}) {
  // mutate itemData object to include id within metadata object
  for (let key in itemData) itemData[key].id = key;

  // initialize state hooks
  const [_itemSelected, _setItemSelected] = useState(
    itemData[defaultSelect] 
      || { id: "default", value: defaultValue, text: placeholder }
  );
  const [_menuOpen, _setMenuOpen] = useState(false);
  const dropdownContainer = useRef(null);

  // all component styles
  let className = {
    self: "dropdown relative w-fit",

    list: {
      self: "absolute hidden w-full bg-button-primary list rounded-b z-[9999] p-1",

      inner: {
        self: "flex-col bg-transparent overflow-y-hidden z-[9999]"
      },

      buttons: {
        self: "w-full relative bg-transparent justify-center", 
        __selected: {
          self: "bg-button-hover-primary"
        }
      },
    },

    menuButton: {
      inner: {
        self: "w-full"
      },
      __selected: {
        self: "rounded-b-none"
      }
    },

    __selected: {
      list: {
        self: "flex"
      }
    }
  }

  className = mergeClass(
    className,
    importedClassName,
    { _isSelected: _menuOpen }
  );

  const onMenuClick = () => {
    if (toggleOnClick) {
      _setMenuOpen(!_menuOpen);
    }
  }

  const showDropdown = () => _setMenuOpen(true);
  const hideDropdown = () => _setMenuOpen(false);

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

  return (
    <DropdownProvider
    value={{
      _itemSelected,
      _setItemSelected,
      _menuOpen,
      _setMenuOpen,
      className,
      itemData,
      mode,
    }}>
      <div 
      ref={dropdownContainer}
      className={className.self} 
      onMouseLeave={toggleOnHover ? hideDropdown : emptyFunc}>
        <Button 
        onClick={onMenuClick} 
        // onBlur={hideMenuOnBlur ? hideDropdown : emptyFunc}
        onMouseEnter={toggleOnHover ? showDropdown : emptyFunc}
        rightIcon={_menuOpen ? rightIconSelected : rightIconUnselected}
        leftIcon={_menuOpen ? leftIconSelected : leftIconUnselected}
        className={className.menuButton}
        state={{ _isSelected: _menuOpen }}>
          {_itemSelected.text}
        </Button>
        <div className={className.list.self}>
          <div 
          className={className.list.inner.self}>
            {children}
          </div>
        </div>
      </div>
    </DropdownProvider>
  );
}

Dropdown.Item = DropdownItem;

export default Dropdown;