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

  const data = await Foobar.find();

  console.log("will this have env?: ", process.env.MONGODB_URI);

  return data;
}

const Home = function({
  
}) {

  (async () => {
    const data = await FoobarAPI.getAll();
    console.log("from model api: ", data);

    const data2 = await customFetch();
    console.log("from custom fetch: ", data2);

    /*
      ? note: must manually connect to mongodb if using in-line query
    */
    await connectMongoDB();
    const data3 = await Foobar.find();
    console.log("from raw fetch: ", data3);
  })();


  return (
    <Page className="bg-primary">
      <_Fetching FoobarAPI={FoobarAPI} customFetch={customFetch}/>
    </Page>
  )
}

export default Home;