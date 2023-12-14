
import { useState, useRef, useEffect } from "react";
import ImageButton from "./ImageButton";
import Text from "../Typography/Text";
import mergeClass from "@/util/mergeClass";
import emptyFunc from "@/util/emptyFunc";

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

  return (
    <div className={className.self}>
      <ImageButton
      onClick={() => addValue(increment)}
      className={className.addButton}
      src="/icons/plus_icon.svg"
      />

      <Text 
      // style={{width: `${textSize}rem`}}
      className={className.text}>
        {_numberVal}
      </Text>

      <ImageButton
      onClick={() => addValue(-increment)}
      className={className.minusButton}
      src="/icons/minus_icon.svg"
      />
    </div>
  );
};

export default Quantifier;