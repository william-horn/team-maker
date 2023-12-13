"use client";

import { useState } from "react";
import Button from "./Button";
import DropdownProvider from "@/providers/DropdownProvider";
import { useDropdownContext } from "@/providers/DropdownProvider";
import mergeClass from "@/util/mergeClass";

const DropdownItem = function({
  children,
  ...rest
}) {
  // const {
    
  // } = useDropdownContext();

  return (
    <Button 
    className={{
      self: "w-full rounded-none relative bg-transparent justify-center", 
    }}
    {...rest}>
      {children}
    </Button>
  );  
}

const Dropdown = function({
  children,
  className: importedClassName={}
}) {

  const [_itemSelected, _setItemSelected] = useState(null);
  const [_menuOpen, _setMenuOpen] = useState(false);

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

  return (
    <DropdownProvider
    value={{
      
    }}>
      <div className={className.self}>
        <Button 
        className={className.menuButton}
        onClick={onMenuClick} 
        state={{ _isSelected: _menuOpen }}>
          Some-Dropdown
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