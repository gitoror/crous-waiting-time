import Head from "next/head";
import Main from "@/components/main.js";

export default function Apropos() {
  return (
    <>
      <Head>
        <title>Attente - Vision</title>
      </Head>
      <Main>
        <h1>Temps d'attente par computer vision</h1>
        <br></br>
        <p>Nombre de personnes entrées</p>
        <p>Nombre de personnes sorties (ayant déjà mangé)</p>
        <p>Nombre de personnes dans le crous (entrée-sortie)</p>
        <br></br>
        <p>Temps d'attente estimé : 10 minutes</p>
      </Main>
    </>
  );
}
