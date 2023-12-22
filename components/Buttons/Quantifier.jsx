
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { StatelessImageButton } from "./ImageButtons";
import Text from "../Typography/Text";
import mergeClass from "@/util/mergeClass";
import emptyFunc from "@/util/defaultFunctions";

const Quantifier = function({
  children,
  defaultValue=0,
  increment=1,
  upperLimit=100,
  lowerLimit=0,
  onValueChanged=emptyFunc,
  className: importedClassName
}) {

  const [_numberVal, _setNumberVal] = useState(defaultValue);
  // const [textWidth, setTextWidth] = useState(null);
  const numberRef = useRef(null);

  /*
    TODO: 

    Discretely increase size of number display so the side buttons don't jolt around
    as the user is changing the values.

    Maybe use Math.ceil(Math.log10(Math.abs(_numberVal)))
  */

  const addValue = quant => {
    const updatedVal = _numberVal + quant;

    if (updatedVal <= upperLimit && updatedVal >= lowerLimit) {
      onValueChanged(updatedVal);
      _setNumberVal(updatedVal);
    }
  }

  let className = {
    self: "flex items-center w-fit",
    text: {
      self: "min-w-[1rem] text-center px-2"
    },
    addButton: {},
    minusButton: {}
  }

  className = mergeClass(
    className,
    importedClassName
  );

  // useLayoutEffect(() => {
  //   const size = numberRef.current.clientWidth;
  //   const mult = Math.floor(Math.log10(Math.max(Math.abs(_numberVal), 1))) + 1;
  //   console.log(mult);
    
  //   setTextWidth(size + mult*5);
  // }, [_numberVal]);

  return (
    <div className={className.self}>
      <StatelessImageButton
      onClick={() => addValue(increment)}
      className={className.addButton}
      src="/icons/plus_icon.svg"
      />

      <Text 
      // style={{
      //   width: `${textWidth}px`, 
      //   minWidth: "fit-content"
      // }}
      ref={numberRef}
      className={className.text}>
        {_numberVal}
      </Text>

      <StatelessImageButton
      onClick={() => addValue(-increment)}
      className={className.minusButton}
      src="/icons/minus_icon.svg"
      />
    </div>
  );
};

export default Quantifier;