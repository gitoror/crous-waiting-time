import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import GetAPIEstWaitTime from '@/components/GetAPIEstWaitTime.js';

export default function ShowWaitTime() {
  const [waitTimes, setWaitTimes] = useState([]);

  useEffect(() => {
    getWaitTimes();
  }, [supabase]);

  async function getWaitTimes() {
    const { data, error } = await supabase.from('wait_times').select();
    if (data) {
      console.log(data);
      setWaitTimes(data);
    }
  }

  return (
    <>
      <h4>
        Temps d'attente actuel : <GetAPIEstWaitTime />
      </h4>
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
