import Head from "next/head";
import Main from "@/components/main.js";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Vision() {
  const [nb_persons, setNb_persons] = useState(0);
  const [nb_persons_out, setNb_persons_out] = useState(0);
  const [nb_persons_in, setNb_persons_in] = useState(0);
  const [wait_time, setWait_time] = useState(0);
  useEffect(() => {
    getNb_persons();
  }, []);
  async function getNb_persons() {
    let { data, err } = await supabase
      .from("vision-counter")
      .select("count_in");
    if (data) {
      console.log(data);
      let total_persons = 0;
      // make the sum of count_in
      for (let i = 0; i < data.length; i++) {
        total_persons += data[i].count_in;
      }
      setNb_persons(total_persons);
      setWait_time(total_persons * 1.5);
    }
  }
  // useEffect(() => {
  //   getNb_persons_out();
  // }, []);
  // async function getNb_persons_out() {
  //   let { data, err } = await supabase.from("number_persons_out").select("*");
  //   if (data) {
  //     setNb_persons_out(data);
  //   }
  // }
  // useEffect(() => {
  //   getNb_persons_in();
  // }, []);
  // async function getNb_persons_in() {
  //   let { data, err } = await supabase.from("number_persons_in").select("*");
  //   if (data) {
  //     setNb_persons_in(data);
  //   }
  // }

  return (
    <>
      <Head>
        <title>Attente - Vision</title>
      </Head>
      <Main>
        <h1>Temps d'attente par computer vision</h1>
        <br></br>
        <p>Nombre de personnes entrées {nb_persons}</p>
        {/* <p>Nombre de personnes sorties (ayant déjà mangé) {nb_persons_out}</p> */}
        {/* <p>Nombre de personnes dans le crous (entrée-sortie)</p> */}
        <br></br>
        <p>Temps d'attente estimé : {wait_time} min</p>
      </Main>
    </>
  );
}
