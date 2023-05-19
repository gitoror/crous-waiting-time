import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ShowWaitTime() {
  const [waitTimes, setWaitTimes] = useState([]);

  useEffect(() => {
    getWaitTimes();
  }, [supabase]);

  async function getWaitTimes() {
    const now = new Date();
    const time_last_minutes = new Date();
    time_last_minutes.setMinutes(time_last_minutes.getMinutes() - 30);
    const nowISO = formatDateToISOString(now);
    const time_last_minutesISO = formatDateToISOString(time_last_minutes);

    //
    let { data, err } = await supabase
      .from("wait_times")
      .select("*")
      .lte("created_at", nowISO)
      .gte("created_at", time_last_minutesISO);
    if (data) {
      //console.log(data);
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

function formatDateToISOString(date) {
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);
  var hours = ("0" + date.getHours()).slice(-2);
  var minutes = ("0" + date.getMinutes()).slice(-2);
  var seconds = ("0" + date.getSeconds()).slice(-2);
  var milliseconds = ("00" + date.getMilliseconds()).slice(-3);

  var timezoneOffset = date.getTimezoneOffset();
  var offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  var offsetMinutes = Math.abs(timezoneOffset) % 60;
  var offsetSign = timezoneOffset < 0 ? "+" : "-";

  var formattedDate =
    year +
    "-" +
    month +
    "-" +
    day +
    "T" +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    "." +
    milliseconds +
    "55" +
    offsetSign +
    ("0" + offsetHours).slice(-2) +
    ":" +
    ("0" + offsetMinutes).slice(-2);

  return formattedDate;
}
