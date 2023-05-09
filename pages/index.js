import Head from "next/head";
import { Inter } from "@next/font/google";
import Main from "@/components/main.js";
import ShowWaitTime from "@/components/ShowWaitTime";
import GiveWaitTime from "@/components/GiveWaitTime";
import ProcessImage from "@/components/ProcessImage";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Crous WT</title>
        <meta name="description" content="Crous WT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Main>
        <GiveWaitTime />
        <br></br>
        <ShowWaitTime />
        <ProcessImage />
      </Main>
    </>
  );
}
