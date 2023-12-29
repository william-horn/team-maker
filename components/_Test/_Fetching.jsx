
"use client";


import { StatefulButton, StatelessButton } from "../Buttons/Buttons";
import ButtonGroup from "../Buttons/ButtonGroup";
import DropdownSelection from "../Buttons/DropdownSelection";

const _Fetching = function({
  
}) {
  console.log("from client: ", process.env.NEXT_PUBLIC_MYKEY);
  console.log("rest: ", process.env);

  const fetchData = async() => {
    const res = await fetch("/api/foobar");
    const data = await res.json();

    console.log("client-side data: ", data);
  }

  fetchData();

  return (
    <div>
      <h1>Fetching</h1>


    </div>
  );
}

export default _Fetching;