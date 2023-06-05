import Head from "next/head";
import Main from "@/components/main.js";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Counter() {
  const [imgsCount, setImgsCount] = useState([]);
  useEffect(() => {
    getImgsCount();
  }, []);
  async function getImgsCount() {
    let { data, err } = await supabase.from("number_persons").select("*");
    if (data) {
      setImgsCount(data);
    }
  }
  return (
    <>
      <Head>
        <title>Compteur de personnes</title>
      </Head>
      <Main>
        <h1>Nombre de personnes sur ces images</h1>
        <br></br>
        <div>
          {imgsCount.map((imgCount) => (
            <div key={imgCount.id}>
              <p>
                {imgCount.img_id} - {imgCount.nb_of_persons}
              </p>
            </div>
          ))}
        </div>
      </Main>
    </>
  );
}
