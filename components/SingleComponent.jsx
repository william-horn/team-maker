
"use client";

import { StatefulButton, StatelessButton, StatelessLink } from "./Buttons/Buttons";
import SearchBar from "./Searchbar";
import Quantifier from "./Buttons/Quantifier";
import ButtonGroup from "./Buttons/ButtonGroup";
import DropdownSelection from "./Buttons/DropdownSelection";
import { StatefulImageButton, StatelessImageButton } from "./Buttons/ImageButtons";

const SingleComponent = function({
  
}) {


  return (
    <div className="p-5">
      <StatelessImageButton
      onClick={d => console.log(d)}
      src="/icons/profile_icon.svg"
      />

      <StatefulImageButton
      onClick={d => console.log(d)}
      src="/icons/profile_icon.svg"
      />

    </div>
  );
};

export default SingleComponent;

