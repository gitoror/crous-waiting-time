import Head from "next/head";
import Main from "@/components/main.js";

export default function Apropos() {
  return (
    <>
      <Head>
        <title>À propos - Crous WT</title>
      </Head>
      <Main>
        <h2>La raison d'être</h2>
        <p>
          Vous en avez marre de perdre votre temps dans la queue de la cantine
          du Crous d'Artem ? Ce site est la solution à ce problème ! Prenez
          connaissance du<b> temps d'attente en temps réel </b>pour savoir quel
          est le<b> meilleur moment </b>pour aller manger au Crous.
        </p>
        <br></br>
        <h2>Futures fonctionnalités</h2>
        <p>
          Plus vous utiliserez ce site et plus nous pourrons connaitre les
          <b> périodes d'affluences </b>du Crous. Nous pourrons alors vous
          partager nos<b> prévisions </b>sur le moment idéal pour aller au Crous
          !
        </p>
      </Main>
    </>
  );
}
