// import dotenv from "dotenv";
// dotenv.config();

import { StorageClient } from "@supabase/storage-js";

const STORAGE_URL = "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1";
const SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MDY4MDYwMywiZXhwIjoxOTk2MjU2NjAzfQ.ZJ3PG3ObzWGeSDG9GQ28ypwNIPcSOtAxiKgcprH59F8"; //! service key, not anon key

const storageClient = new StorageClient(STORAGE_URL, {
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
});

const { data, error } = await storageClient.listBuckets();

console.log(data, error);
