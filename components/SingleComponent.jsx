
"use client";

import { StatefulButton, StatelessButton, StatelessLink } from "./Buttons/Buttons";
import SearchBar from "./Searchbar";
import Quantifier from "./Buttons/Quantifier";
import ButtonGroup from "./Buttons/ButtonGroup";
import DropdownSelection from "./Buttons/DropdownSelection";

const SingleComponent = function({
  
}) {


  return (
    <div className="p-5">

<ButtonGroup>
  <StatefulButton onClick={d => console.log(d)} eventData={{x: 1}} id="two">Stateful</StatefulButton>
</ButtonGroup>
{/* 
      ButtonGroup onClick={d => console.log("group: ", d)}>
        <StatelessButton id="one" value="100">Testing</StatelessButton>
        <StatefulButton id="two">Stateful</StatefulButton>
        <StatelessLink id="three" href="/test-page">Some Link</StatelessLink>
      </ButtonGroup>

      <Quantifier/> */}

      <DropdownSelection>
        <StatelessButton id="one" text="Option One" onClick={d => console.log("dropdown: ", d)}>Option 1</StatelessButton>
        <StatelessButton id="two" text="Option Two">Option 2</StatelessButton>
        <StatelessButton id="three" text="Option Three">Option 3</StatelessButton>
        <StatelessButton id="four" text="Option Four">Option 4</StatelessButton>
      </DropdownSelection> 



    </div>
  );
};

export default SingleComponent;

