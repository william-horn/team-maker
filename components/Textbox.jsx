

import React from 'react';

const Textbox = React.forwardRef(function({
  
}, ref) {
  return (
    <input className="bg-white"/>
  );
});

Textbox.displayName = "Textbox"; // for ESlint
export default Textbox;