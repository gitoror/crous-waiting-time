import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function GiveWaitTime() {
  const [waitTime, setWaitTime] = useState("");
  const [name, setName] = useState("");

  async function createWaitTime() {
    if (waitTime.length && name.length) {
      const { data, error } = await supabase
        .from("wait_times")
        .insert({ waiting_time: waitTime, name: name });
      if (!error) {
        setWaitTime("");
        setName("");
      }
    }
  }

  return (
    <>
      <div>
        <h3 style={{ "margin-bottom": "10px" }}>
          Selon vous, quel est le temps d'attente dans la queue du Crous d'Artem
          ?
        </h3>
        <textarea
          type="text"
          value={waitTime}
          placeholder="Temps en minutes. Par exemple: 15"
          onChange={(e) => setWaitTime(e.target.value)}
          style={{
            width: "30%",
            height: "30px",
            border: "1px solid",
            "border-radius": "5px",
            padding: "4px 0px 0px 4px",
            resize: "none",
          }}
        ></textarea>
        <textarea
          type="text"
          value={name}
          placeholder="Surnom"
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "10%",
            height: "30px",
            border: "1px solid",
            "border-radius": "5px",
            padding: "4px 0px 0px 4px",
            "margin-left": "10px",
            resize: "none",
          }}
        ></textarea>
        <button
          style={{
            border: "1px solid",
            "background-color": "white",
            "border-radius": "3px",
            padding: "4px",
            display: "block",
          }}
          onClick={createWaitTime}
        >
          Envoyer
        </button>
      </div>
    </>
  );
}
