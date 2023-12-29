
"use client";

// import { StatefulButton, StatelessButton, StatelessLink } from "./Buttons/Buttons";
// import SearchBar from "./Searchbar";
// import Quantifier from "./Buttons/Quantifier";
// import ButtonGroup from "./Buttons/ButtonGroup";
// import DropdownSelection from "./Buttons/DropdownSelection";
// import { StatefulImageButton, StatelessImageButton } from "./Buttons/ImageButtons";

import BarChart from "../Charts/BarChart";

const SingleComponent = function({
  
}) {


  return (
    <div className="p-5">
 
      <BarChart
      config={{
        direction: "horizontal",
        labels: ["item_1", "item_2", "item_3", "item_4"],
        data: [6, 3, 65, 12, 42],

        xAxis: {

        },
        yAxis: {

        }
      }}
      />
    </div>
  );
};

export default SingleComponent;

