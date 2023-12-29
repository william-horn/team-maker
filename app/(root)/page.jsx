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
import Foobar from '@/models/foobars';

const Home = function({
  
}) {


  const fetchData = async() => {
    await connectMongoDB();

    const res = await Foobar.find();
    console.log("Got data: ", res);
  }

  fetchData();

  return (
    <Page className="bg-primary">
      <_Fetching/>
    </Page>
  )
}

export default Home;