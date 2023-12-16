
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

  <ButtonGroup something="idk lol" defaultSelect={["one"]} onClick={() => {console.log("group")}}>
    <StatefulButton id="one">Stateful</StatefulButton>
    <StatelessButton id="two">Stateless</StatelessButton>
  </ButtonGroup>

  <StatefulButton>Testing</StatefulButton>
  <StatelessButton>Testing Stateless</StatelessButton>
      
    </div>
  );
};

export default SingleComponent;

