import { useState } from "react";
import { uploadMedia } from "../utils/mediaUpload";

export default function TestPage(){
    const [file, setFile] = useState(null);

    async function handleUpload(){
        try{
            const url = await uploadMedia(file);
            console.log("File uploaded successfully. URL:", url);
        } catch (error) {
            console.error("Error uploading file:", error);

        }
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center bg-slate-50 p-6">
            <div className="bg-white border border-slate-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Media Upload</h2>
                <p className="text-slate-500 text-sm mb-6">Select a file from your device to upload it to the cloud.</p>
                
                <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-6 mb-6 transition duration-150 bg-slate-50/50 flex flex-col items-center justify-center cursor-pointer">
                    <input 
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }} 
                        type="file" 
                        className="text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer w-full"
                    />
                </div>

                <button 
                    onClick={handleUpload} 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 transition duration-150 cursor-pointer"
                >
                    Upload File
                </button>
            </div>
        </div>
    )
}

