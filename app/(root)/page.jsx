import Image from 'next/image'

/*
  This is the home page component, meaning it should remain a server-side component. Therefore,
  for button-testing purposes, we must create a client component that handles the interactivity logic
  between the user and the button, and nest the button in said client component.
*/
import Page from '@/components/Page';
import Content from '@/components/Content';
import Heading from '@/components/Typography/Heading';
import _Components from '@/components/_Test/_Components';
import _Fetching from '@/components/_Test/_Fetching';

import connectMongoDB from '@/lib/db/mongodb-connect';
import FoobarAPI, { Foobar } from '@/models/foobar/api';


/*
  I can declare custom fetch functions here, with the imported
  database model if desired. Should only need to do this if
  it doesn't make sense to create a specific API call inside
  the model's API file.
*/
const customFetch = async () => {
  /*
    must declare 'use server' if the function is being passed to a client components
    ? note: using 'use server' in a function now makes this a 'server action'
    ? note: all 'server actions' must be async functions
  */
  "use server";

  // note: must manually connect to mongodb if using inline-query
  await connectMongoDB();
  const data = await Foobar.find();

  return data;
}

const Home = function({
  
}) {
  /*
    Example GET requests to the database

    ? note: 
    We can do initial queries in server components before rendering. However,
    we cannot do this in client components. Client components must use 'useEffect' or
    some way of fetching the data after an initial render.

    Because of this, server-components can also be async functions, whereas client
    components cannot.
  */
  const getData = async () => {
    // const data = await FoobarAPI.getAll({});
    // console.log("from model api: ", data);

    // const data2 = await customFetch();
    // console.log("from custom fetch: ", data2);

    /*
      ? note: must manually connect to mongodb if using in-line query
    */
    await connectMongoDB();

    
    // const data3 = await Foobar.find({
    //   $nor: [
    //     { name: 'Will' },
    //     { name: 'Billy' }
    //   ]
    // }).select('name');

    console.log('fetching...');
    const data3 = await Foobar.find();
    // const asd = [];

    // for (let k in data3) {
    //   const v = data3[k];
    //   asd[k] = {
    //     name: `${v.name}-${Math.floor(Math.random()*99999)}`,
    //     description: v.description
    //   }
    // }

    // const res = await fetch('https://random-word-api.herokuapp.com/word?number=10000');
    // const data = await res.json();

    // const newDocs = [];
    // for (let k in data) {
    //   newDocs[k] = { name: data[k], description: "some random word" }
    // }

    // await Foobar.insertMany(newDocs);

    console.log("from raw fetch: ", data3[1]);
  }

  getData();

  /*
    ? note:

    In order to give client components access to fetch/query methods, we can pass such methods
    down as props to the component. Alternatively, we could create a separate file with "use server"
    at the top, export the functions, and import that file inside the client component.

    * note: Only async functions can be exported in a 'use server' file.
  */
  return (
    <Page className="bg-primary">
      <_Components/>
      {/* <_Fetching FoobarAPI={FoobarAPI} customFetch={customFetch}/> */}
    </Page>
  )
}

export default Home;