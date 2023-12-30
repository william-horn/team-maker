"use client";

/*
  This is the alternative method to passing fetch() function props to client
  components: import a 'use server' file with exports that run all the
  fetches/queries on the database.
*/
import { getAll as fetchAll } from "../../../../models/foobar/api-exports";

import { useEffect } from "react";
import { useSearchParams, useParams } from "next/navigation";

const FetchComponent = function({
  FoobarAPI
}) {
  const urlParams = useParams();
  const queryParams = useSearchParams();
  // console.log(queryParams.get('select'));
  // console.log(urlParams.id);

  const getData = async () => {
    /*  
      Using the custom API, passed down from a server
      component as props
    */
    const data = await FoobarAPI.getAll({
      limit: queryParams.get('limit'),
      select: queryParams.get('select')
    });
    console.log('got data: ', data);

    /*
      Using the custom API, imported from another 'use server' file.
      * This should be the recommended strategy.
    */
    const importedFetchData = await fetchAll({limit: 5});
    console.log('imported fetch: ', importedFetchData);
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <div>
      <h2>Fetched component</h2>
    </div>
  );
}

export default FetchComponent;