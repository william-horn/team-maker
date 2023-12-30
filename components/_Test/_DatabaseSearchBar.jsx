

"use client";

import SearchBar from "../Searchbar";
import { useState, useEffect } from "react";

import { getAllExcept as getAllFooExcept, getAll as getAllFoo } from "@/models/foobar/api-exports";

const _DatabaseSearchBar = function({

}) {
  // useEffect(() => {
  //   getAllFoo({limit: 20})
  //     .then(data => setSearchCache(data.map(v => v.name)));
  // }, []);

  return (
    <div>
      <SearchBar
      displayResultsSize={2}
      displayHistorySize={0}
      fetchBatchLoad={2}
      cacheLimit={25}
      fetchResults={getAllFooExcept}
      />
    </div>
  );
}

export default _DatabaseSearchBar;

