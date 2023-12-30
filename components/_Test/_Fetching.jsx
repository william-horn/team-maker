
"use client";


import { StatefulButton, StatelessButton, StatelessLink } from "../Buttons/Buttons";
import Link from "next/link";
import ButtonGroup from "../Buttons/ButtonGroup";
import DropdownSelection from "../Buttons/DropdownSelection";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const _Fetching = function({
  FoobarAPI,
  customFetch
}) {
  const router = useRouter();

  /*
    Fetching data client-side. Client has full access to model API, as long
    as the API contains only 'server actions' (or async functions with 'use server').

    ? note: client-side API calls cannot run on the initial render of the component - this will error

    Instead, we have to use something like 'useEffect' to ensure the component renders before the API 
    call is made.
  */
  const getData = async () => {
    const data = await FoobarAPI.getAll({});
    console.log("on client with api: ", data);

    const data2 = await customFetch();
    console.log("on client with custom fetch: ", data2);
  }

  useEffect(() => {
    getData();
  }, []);

  const onButtonClick = () => {
    router.push(`/page-1/123?limit=3&select=description`);
  }

  return (
    <div>
      <h1>Fetching</h1>

      <StatelessButton onClick={onButtonClick}>Go to Page 1</StatelessButton>
    </div>
  );
}

export default _Fetching;