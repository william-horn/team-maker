"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import DropdownProvider from "@/providers/DropdownProvider";
import { useDropdownContext } from "@/providers/DropdownProvider";
import mergeClass from "@/util/mergeClass";
import emptyFunc from "@/util/emptyFunc";

const DropdownItem = function({
  children,
  id,
  ...rest
}) {
  const {
    _menuOpen: group_menuOpen,
    _setMenuOpen: group_setMenuOpen,
    _itemSelected: group_itemSelected,
    _setItemSelected: group_setItemSelected,
    itemData: group_itemData,
  } = useDropdownContext();

  const itemData = group_itemData[id];
  const isSelected = group_itemSelected.id === id;

  if (!itemData) {
    throw Error("Item data does not exist for id \"" + id + "\"");
  }

  const onItemSelected = () => {
    if (!isSelected) {
      group_setItemSelected(itemData);
      group_setMenuOpen(false);
    }
  }

  return (
    <Button 
    onClick={onItemSelected}
    state={{ _isSelected: isSelected }}
    className={{
      self: "w-full rounded-none relative bg-transparent justify-center", 
      __selected: {
        self: "bg-button-hover-primary"
      }
    }}
    {...rest}>
      {children}
    </Button>
  );  
}

const Dropdown = function({
  itemData={},
  children,
  hideMenuOnBlur=true,
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
  const [_itemSelected, _setItemSelected] = useState(itemData[defaultSelect] || { value: defaultValue, text: placeholder });
  const [_menuOpen, _setMenuOpen] = useState(false);

  // all component styles
  let className = {
    self: "dropdown relative w-fit",

    list: {
      self: "absolute hidden flex-col w-full bg-button-primary list rounded-b overflow-hidden max-h-28"
    },

    menuButton: {},
    buttons: {},

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
    _setMenuOpen(!_menuOpen);
  }

  // useEffect(() => {
  //   console.log("dropdown: ", _itemSelected);
  // });

  return (
    <DropdownProvider
    value={{
      _itemSelected,
      _setItemSelected,
      _menuOpen,
      _setMenuOpen,
      itemData,
    }}>
      <div className={className.self}>
        <Button 
        onBlur={hideMenuOnBlur ? () => _setMenuOpen(false) : emptyFunc}
        rightIcon={_menuOpen ? rightIconSelected : rightIconUnselected}
        leftIcon={_menuOpen ? leftIconSelected : leftIconUnselected}
        className={className.menuButton}
        onClick={onMenuClick} 
        state={{ _isSelected: _menuOpen }}>
          {_itemSelected.text}
        </Button>
        <div className={className.list.self}>
          {children}
        </div>
      </div>
    </DropdownProvider>
  );
}

Dropdown.Item = DropdownItem;

export default Dropdown;