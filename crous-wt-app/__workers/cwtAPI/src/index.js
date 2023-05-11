/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createClient } from '@supabase/supabase-js';

export default {
  async fetch(request, env) {
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('request :', request.url);
    let data = {
      error: 'method not allowed',
    };

    //method POST pour envoyer le temps d'attente estimé par l'utilisateur
    if (request.method === 'POST') {
      console.log('post method');

      const body = await request.json();
      console.log(body.waitTime);

      data = {
        waitTimeGivenByUser: body.waitTime,
      };

      try {
        const { data, error } = await supabase.from('test_cloudflare_workers').insert([{ posted_by: body.user_id, est_wait_time: body.waitTime }]);
      } catch (error) {
        console.log('error :', error);
        data = {
          error: error,
        };
      }
    }

    //method GET pour récupérer le temps d'attente
    if (request.method === 'GET') {
      console.log('get method');

      let { data: waitTimes, error } = await supabase.from('test_cloudflare_workers').select('est_wait_time');

      let s = 0;
      for (let i = 0; i < waitTimes.length; i++) {
        s += waitTimes[i].est_wait_time;
        console.log('waitTimes[', i, '] :', waitTimes[i].est_wait_time);
      }
      data = {
        averageWaitTime: s / waitTimes.length,
      };
      console.log('data.averageWaitTime (sent) :', data.averageWaitTime);
    }

    const json = JSON.stringify(data, null, 2);

    const response = new Response(json, {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });

    return response;
  },
};
