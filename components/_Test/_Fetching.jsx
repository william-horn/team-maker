
"use client";


import { StatefulButton, StatelessButton } from "../Buttons/Buttons";
import ButtonGroup from "../Buttons/ButtonGroup";
import DropdownSelection from "../Buttons/DropdownSelection";
import { useEffect } from "react";

const _Fetching = function({
  FoobarAPI,
  customFetch
}) {

  /*
    Fetching data client-side. Client has full access to model API, as long
    as the API contains only 'server actions' (or async functions with 'use server').

    ? note: client-side API calls cannot run on the initial render of the component - this will error

    Instead, we have to use something like 'useEffect' to ensure the component renders before the API 
    call is made.
  */
  const getData = async () => {
    const data = await FoobarAPI.getAll();
    console.log("on client with api: ", data);

    const data2 = await customFetch();
    console.log("on client with custom fetch: ", data2);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1>Fetching</h1>


    </div>
  );
}

export default _Fetching;