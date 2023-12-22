
"use client";

import React from 'react';
import { StatelessButton, LinkButton, StatefulButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import ImageButton from './Buttons/ImageButtons';

const SingleComponent = function({
  
}) {

  return (
    <div className="p-5">

    {/* <ImageButton
    src="/icons/close_icon.svg"
    /> */}
    <StatefulButton 
    onClick={data => console.log(data)}
    rightIconHovered="/icons/history_icon.svg"
    rightIconSelected="/icons/label_icon.svg"
    rightIcon="/icons/search_icon.svg">
      Hover Test (2nd page)
    </StatefulButton>
      
    </div>
  );
};

export default SingleComponent;

