
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

      <ButtonGroup onClick={d => console.log("group: ", d)}>
        <StatelessButton id="one" value="100">Testing</StatelessButton>
        <StatefulButton id="two">Stateful</StatefulButton>
        <StatelessLink id="three" href="/test-page">Some Link</StatelessLink>
      </ButtonGroup>

      <Quantifier/>

      <DropdownSelection>
        <StatelessButton id="one">Option 1</StatelessButton>
        <StatelessButton id="two">Option 2</StatelessButton>
        <StatelessButton id="three">Option 3</StatelessButton>
        <StatelessButton id="four">Option 4</StatelessButton>
      </DropdownSelection>



    </div>
  );
};

export default SingleComponent;

