
import Page from "@/components/Page";
import Heading from "@/components/Typography/Heading";
import FetchComponent from "./FetchComponent";

import FoobarAPI, { Foobar } from '@/models/foobar/api';
import connectMongoDB from "@/lib/db/mongodb-connect";

const Page1 = function({

}) {

  return (
    <Page>
      <Heading>Page 1</Heading>
      <FetchComponent FoobarAPI={FoobarAPI}/>
    </Page>
  );
}

export default Page1;