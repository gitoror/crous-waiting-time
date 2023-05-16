import { createClient } from "@supabase/supabase-js";
import { StorageClient } from "@supabase/storage-js";

const supabase = createClient(
  "https://butxcgynkfzmgavnapdi.supabase.co/storage/v1",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dHhjZ3lua2Z6bWdhdm5hcGRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA2ODA2MDMsImV4cCI6MTk5NjI1NjYwM30.Ou2vrRzLQJjdbhWukGVrhVVmCF-J3SDt2GviXYA782Y"
);
// Storage Client

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

const { imContent, e } = await storageClient.from("test3").download("im/1.jpg");
console.log(imContent);
