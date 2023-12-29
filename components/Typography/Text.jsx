import { twMerge } from "tailwind-merge";
import React from "react";

const Text = React.forwardRef(function({ 
  children, 
  className: importedClassName="",
  ...rest
}, ref) {

  return (
    <p 
    ref={ref}
    className={twMerge(
      "general-text leading-6 text-primary align-middle text-sm block",
      importedClassName
    )}
    {...rest}>
      {children}
    </p>
  );
});

Text.displayName = "Text"; // for ESlint
export default Text;

