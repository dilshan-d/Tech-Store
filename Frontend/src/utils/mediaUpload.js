import { createClient } from "@supabase/supabase-js/dist/index.cjs";

let url = "https://bynjcewfsdnmuasganeh.supabase.co";
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5bmpjZXdmc2RubXVhc2dhbmVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyMTMwNTYsImV4cCI6MjA5MDc4OTA1Nn0.ylSl9RpqVr-_SJJmo_Nlxa6fgUzWb_clzXbzHV06NyE";

const supabase = createClient(url, key);

export function uploadMedia(file){

    return new Promise((resolve, reject)=>{
        if(!file){
            reject("No file provided");
        }else{
            const timeStamp = new Date().getTime();
            const fileName = timeStamp + "_" + file.name;
            
            supabase.storage.from("images").upload(fileName, file , {
                upsert: false,
                cacheControl: "3600"

            }).then(()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                resolve(publicUrl);

            }).catch((error)=>{
                reject(error.message);
            });
        }
    })
}