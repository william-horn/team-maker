
"use client";

import React from 'react';
import { StatelessButton, StatelessLinkButton, StatefulButton, StatefulLinkButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import ImageButton from './Buttons/ImageButton';

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
      Hover Test
    </StatefulButton>

    <StatelessLinkButton 
    href="/test-page" 
    rightIcon="/icons/profile_icon.svg"
    rightIconHovered="/icons/star_fill_icon.svg"
    state={{__hovered: true}}
    onClick={data=>console.log("link data: ", data)}>
      Link test
    </StatelessLinkButton>

    <StatelessButton 
    state={{__selected: true}}
    onClick={data => console.log("stateless: ", data)}>
      Stateless
    </StatelessButton>

    <StatefulLinkButton 
    rightIconHovered="/icons/search_icon.svg"
    rightIconSelected="/icons/search_icon.svg"
    onClick={data=> console.log("stateful link: ", data)}
    href="/test-page">
      Stateful Link
    </StatefulLinkButton>
      
    </div>
  );
};

export default SingleComponent;

