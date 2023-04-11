import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Main from "@/components/main.js";
import ShowWaitTime from "@/components/ShowWaitTime";
import GiveWaitTime from "@/components/GiveWaitTime";

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
      </Main>
    </>
  );
}
