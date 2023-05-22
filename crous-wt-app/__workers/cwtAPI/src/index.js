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

      function formatDateToISOString(date) {
        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);
        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);
        var milliseconds = ('00' + date.getMilliseconds()).slice(-3);

        var timezoneOffset = date.getTimezoneOffset();
        var offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
        var offsetMinutes = Math.abs(timezoneOffset) % 60;
        var offsetSign = timezoneOffset < 0 ? '+' : '-';

        var formattedDate = year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + '.' + milliseconds + '55' + offsetSign + ('0' + offsetHours).slice(-2) + ':' + ('0' + offsetMinutes).slice(-2);

        return formattedDate;
      }

      const now = new Date();
      const time_last_minutes = new Date();
      time_last_minutes.setMinutes(time_last_minutes.getMinutes() - 30);
      const nowISO = formatDateToISOString(now);
      const time_last_minutesISO = formatDateToISOString(time_last_minutes);

      //

      let { data: waitTimes, error } = await supabase.from('wait_times').select('waiting_time').lte('created_at', nowISO).gte('created_at', time_last_minutesISO);

      if (waitTimes.length > 5) {
        let s = 0;

        for (let i = 0; i < waitTimes.length; i++) {
          s += waitTimes[i].waiting_time;
          console.log('waitTimes[', i, '] :', waitTimes[i].waiting_time);
        }
        data = {
          averageWaitTime: s / waitTimes.length,
        };
        console.log('data.averageWaitTime (sent) :', data.averageWaitTime);
      } else {
        data = {
          error: 'not enough data',
        };
      }
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
