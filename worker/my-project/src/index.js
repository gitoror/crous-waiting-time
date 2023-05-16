/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { createClient } from "@supabase/supabase-js";
import { StorageClient } from "@supabase/storage-js";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const supabase = createClient(
    "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2ODA2MDMsImV4cCI6MTk5NjI1NjYwM30.Ou2vrRzLQJjdbhWukGVrhVVmCF-J3SDt2GviXYA782Y"
  );
  //
  const STORAGE_URL = "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1";
  const SERVICE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDY4MDYwMywiZXhwIjoxOTk2MjU2NjAzfQ.ZJ3PG3ObzWGeSDG9GQ28ypwNIPcSOtAxiKgcprH59F8"; //! service key, not anon key

  const storageClient = new StorageClient(STORAGE_URL, {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
  });
  // Récupérer les données

  const { data, error } = await storageClient.from("test3").list("im");

  console.log(data);
  const newImages = data.filter((image) => !image.metadata?.processed);
  const name = newImages[0].name;
  const { imContent, error: imageError } = await storageClient
    .from("test3")
    .download("im/1.jpg");
  console.log(imContent);
  return new Response("Hello world!");
}

// async function handleRequest(request) {
//   console.log("Cc");
//   // DB Client
//   const supabase = createClient(
//     "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1",
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2ODA2MDMsImV4cCI6MTk5NjI1NjYwM30.Ou2vrRzLQJjdbhWukGVrhVVmCF-J3SDt2GviXYA782Y"
//   );
//   // Storage Client
//   const STORAGE_URL = "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1";
//   const SERVICE_KEY =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDY4MDYwMywiZXhwIjoxOTk2MjU2NjAzfQ.ZJ3PG3ObzWGeSDG9GQ28ypwNIPcSOtAxiKgcprH59F8"; //! service key, not anon key
//   const storageClient = new StorageClient(STORAGE_URL, {
//     apikey: SERVICE_KEY,
//     Authorization: `Bearer ${SERVICE_KEY}`,
//   });
//   // Récupérer les données
//   const { images, error } = await storageClient.from("test3").list("im");
//   if (error) {
//     return new Response("Error retrieving images from Supabase", {
//       status: 500,
//     });
//   }
//   const newImages = images.filter((image) => !image.metadata?.processed);
//   if (newImages.length === 0) {
//     return new Response("No new images to process", { status: 200 });
//   }
//   //
//   const promises = newImages.map(async (image) => {
//     const imageData = await storageClient.from("test3").download(image.name);
//     const processedData = processImage(imageData);
//     const { error } = await storageClient
//       .from("test3")
//       .upload(
//         `${getBaseName(image.name)}_processed.${getExtension(image.name)}`,
//         processedData,
//         { metadata: { processed: true } }
//       );
//     if (error) {
//       return new Response(
//         `Error uploading processed image ${image.name} to Supabase`,
//         { status: 500 }
//       );
//     }
//     const result = getResult(processedData);
//     const { data, error: insertError } = await supabase
//       .from("worker")
//       .insert({ val: result });
//     if (insertError) {
//       return new Response(
//         `Error inserting result for image ${image.name} to Supabase`,
//         { status: 500 }
//       );
//     }
//     return new Response(
//       `Processed image ${image.name} and inserted result ${result} to Supabase`,
//       { status: 200 }
//     );
//   });
//   await Promise.all(promises);
//   return new Response("Processing complete", { status: 200 });
// }

function getExtension(filename) {
  const parts = filename.split(".");
  return parts[parts.length - 1].toLowerCase();
}

function getBaseName(filename) {
  const parts = filename.split(".");
  return parts.slice(0, parts.length - 1).join(".");
}

function processImage(imageData) {
  // Traitement de l'image
  processedData = imageData;
  return processedData;
}

function getResult(processedData) {
  // Calcul du résultat à partir de l'image traitée
  processedData = getBaseName(imageData);
  return result;
}
