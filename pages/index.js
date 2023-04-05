import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Main from "@/components/main.js";

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
        <h3>
          Selon vous, quel est le temps d'attente dans la queue du Crous d'Artem
          ?
        </h3>
        <input
          className={styles.input_msg}
          types="text"
          placeholder="Envoyer un message"
        ></input>
      </Main>
    </>
  );
}
