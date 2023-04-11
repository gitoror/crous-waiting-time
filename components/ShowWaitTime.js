import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ShowWaitTime() {
  const [waitTimes, setWaitTimes] = useState([]);

  useEffect(() => {
    getWaitTimes();
  }, [supabase]);

  async function getWaitTimes() {
    const { data, error } = await supabase.from("wait_times").select();
    if (data) {
      console.log(data);
      setWaitTimes(data);
    }
  }

  return (
    <>
      {/* Mettre le résultat de la edge function ici */}
      <h4>Temps d'attente actuellement :</h4>
      <br></br>
      <h4>Liste des participants à cette estimation :</h4>
      <div>
        {waitTimes.map((waitTime) => (
          <div key={waitTime.id}>
            <p>
              {waitTime.name} - {waitTime.waiting_time} min
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
