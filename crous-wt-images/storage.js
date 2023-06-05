// import { createClient } from "@supabase/supabase-js";
// import { StorageClient } from "@supabase/storage-js";
// const SUPABASE_URL = "https://butxcgynkfzmgavnapdi.supabase.co";
// const SUPABASE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2ODA2MDMsImV4cCI6MTk5NjI1NjYwM30.Ou2vrRzLQJjdbhWukGVrhVVmCF-J3SDt2GviXYA782Y";
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Storage Client

// const STORAGE_URL = "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1";
// const SERVICE_KEY =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDY4MDYwMywiZXhwIjoxOTk2MjU2NjAzfQ.ZJ3PG3ObzWGeSDG9GQ28ypwNIPcSOtAxiKgcprH59F8"; //! service key, not anon key

// const storageClient = new StorageClient(STORAGE_URL, {
//   apikey: SERVICE_KEY,
//   Authorization: `Bearer ${SERVICE_KEY}`,
// });
// // Récupérer les données

// const { data, error } = await storageClient.from("music").list("msc");

// console.log(data);

// const { song, e } = await storageClient.from("music").download("msc/song.m4a");
// console.log(song);

const song = await fetch(
  "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1/object/public/music/msc/song.m4a"
);
console.log(song.headers);
console.log(song.body);
console.log(typeof song.body);
console.log(song.body.getReader());
console.log(song.json);

// console.log(song.headers);
// console.log(song.body);
// console.log(typeof song);
// // ReadableStream to save in file
// // const fs = require("fs");
// import fs from "fs";
// const fileStream = fs.createWriteStream("song.m4a");

// import fetch from "node-fetch";
// import ffmpeg from "ffmpeg/ffmpeg.js";

// const songUrl =
//   "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1/object/public/music/msc/song.m4a";

// const convertToM4A = async () => {
//   // Fetch the audio file
//   const response = await fetch(songUrl);
//   const arrayBuffer = await response.arrayBuffer();

//   // Create a Uint8Array from the fetched data
//   const uint8Array = new Uint8Array(arrayBuffer);

//   // Convert the audio data using ffmpeg.js
//   const ffmpegInstance = ffmpeg();
//   await ffmpegInstance.load();

//   ffmpegInstance.FS("writeFile", "input.m4a", uint8Array);

//   // Run the conversion using the appropriate ffmpeg command
//   await ffmpegInstance.run("-i", "input.m4a", "output.m4a");

//   // Get the converted audio file as a Uint8Array
//   const outputData = ffmpegInstance.FS("readFile", "output.m4a");

//   // Save the outputData Uint8Array as an M4A file
//   const outputBuffer = outputData.buffer;
//   const outputBlob = new Blob([outputBuffer], { type: "audio/m4a" });
//   const outputFileUrl = URL.createObjectURL(outputBlob);

//   // You can then use the outputFileUrl to download or play the M4A file
//   console.log("Output File URL:", outputFileUrl);
// };

// convertToM4A();
