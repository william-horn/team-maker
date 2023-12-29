
"use client";


import { StatefulButton, StatelessButton } from "../Buttons/Buttons";
import ButtonGroup from "../Buttons/ButtonGroup";
import DropdownSelection from "../Buttons/DropdownSelection";

const _Components = function({

}) {

  return (
    <div>
      <DropdownSelection>
        <StatelessButton id="one">Testing 1</StatelessButton>
        <StatelessButton id="two">Testing 2</StatelessButton>
        <StatelessButton id="three">Testing 3</StatelessButton>
        <StatelessButton id="four">Testing 4</StatelessButton>
      </DropdownSelection>
    </div>
  );
}

export default _Components;