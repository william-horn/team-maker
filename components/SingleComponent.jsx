
"use client";

import React from 'react';
import { StatelessButton, LinkButton, StatefulButton } from './Buttons/Buttons';
import ButtonGroup from './Buttons/ButtonGroup';
import ImageButton from './Buttons/ImageButton';

const SingleComponent = function({
  
}) {

  return (
    <div className="p-5">

    {/* <ImageButton
    src="/icons/close_icon.svg"
    /> */}

  <ButtonGroup 
  something="idk lol" 
  defaultSelect={["one"]} 
  selectionLimit={1}
  // unselectLastChoice
  onSelectionLimitReached={(bd) => console.log("limit reached: ", bd)}
  onClick={() => {console.log("group")}}>
    <StatefulButton id="one">Stateful</StatefulButton>
    <StatelessButton id="two">Stateless</StatelessButton>
    <StatefulButton id="three">Third</StatefulButton>
  </ButtonGroup>

  <ButtonGroup>
    <StatelessButton id="one">First</StatelessButton>
    <StatelessButton id="two">Second</StatelessButton>
    <StatelessButton id="three">Third</StatelessButton>
  </ButtonGroup>

  <StatefulButton id="lol" value="sure" leftIcon="" onClick={stuff => console.log("stuff: ", stuff)}>Testing</StatefulButton>
  <StatelessButton>Testing Stateless</StatelessButton>
      
    </div>
  );
};

export default SingleComponent;

