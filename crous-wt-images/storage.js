import { createClient } from "@supabase/supabase-js";
// import { StorageClient } from "@supabase/storage-js";
const SUPABASE_URL = "https://butxcgynkfzmgavnapdi.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2ODA2MDMsImV4cCI6MTk5NjI1NjYwM30.Ou2vrRzLQJjdbhWukGVrhVVmCF-J3SDt2GviXYA782Y";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
//
const now = new Date();
const time_last_minutes = new Date();
time_last_minutes.setMinutes(time_last_minutes.getMinutes() - 30);
const nowISO = formatDateToISOString(now);
const time_last_minutesISO = formatDateToISOString(time_last_minutes);
console.log(now);
//
let { data, err } = await supabase
  .from("wait_times")
  .select("*")
  .lte("created_at", nowISO)
  .gte("created_at", time_last_minutesISO);
console.log(data);

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

// Exemple d'utilisation :
var currentDate = new Date();
var formattedDate = formatDateToISOString(currentDate);
console.log(formattedDate);

// Storage Client

// const STORAGE_URL = "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1";
// const SERVICE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDY4MDYwMywiZXhwIjoxOTk2MjU2NjAzfQ.ZJ3PG3ObzWGeSDG9GQ28ypwNIPcSOtAxiKgcprH59F8"; //! service key, not anon key

// const storageClient = new StorageClient(STORAGE_URL, {
//   apikey: SERVICE_KEY,
//   Authorization: `Bearer ${SERVICE_KEY}`,
// });
// // Récupérer les données

// const { data, error } = await storageClient.from("test3").list("im");

// console.log(data);

// const { imContent, e } = await storageClient.from("test3").download("im/1.jpg");
// console.log(imContent);

// import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   "https://butxcgynkfzmgavnapdi.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2ODA2MDMsImV4cCI6MTk5NjI1NjYwM30.Ou2vrRzLQJjdbhWukGVrhVVmCF-J3SDt2GviXYA782Y"
// );

// const { data, error } = await supabase.from("number_persons").select();
// console.log(data);
