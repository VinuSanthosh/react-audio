import React from 'react';
import { ReactMic } from 'react-mic';

const ReactAudio = () => {
    const [isRunning, setIsRunning] = React.useState(false);
    const [voice, setVoice] = React.useState(false);
    const [recordBlobLink, setRecordBlobLink] = React.useState(null);


    const onStop = (recordedBlob) => {
        setRecordBlobLink(recordedBlob.blobURL);
        setIsRunning(false)
    };

    const startHandle = () => {
        setIsRunning(true)
        setVoice(true)
    }
    const stopHandle = () => {
        setIsRunning(false)
        setVoice(false)
    }

    const clearHandle = () => {
        setIsRunning(false)
        setVoice(false)
        setRecordBlobLink(false)        
    }

    return (
        <div>
            <div className=" max-w-sm border py-4 px-6 mx-auto ">
                <h2 className=" text-[22px] font-semibold ">Audio Recorder</h2>
                
                <ReactMic
                    record={voice}
                    mimeType= "audio/mp3"
                    className=""
                    onStop={onStop}
                    strokeColor="#000000"
                    width="200"
                />
                
                <div className=" mt-2  ">
                    {!voice ? <button onClick={startHandle} className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Start</button> : <button onClick={stopHandle} className=" bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] ">Stop</button>}
                </div>
                <div className="mt-2 ">
                    {recordBlobLink ? <button onClick={clearHandle} className="bg-[#fff] text-[#111] rounded-md py-1 px-3 font-semibold text-[16px] "> Clear </button> : ""}
                </div>
                <div className="">
                    {recordBlobLink ? <audio controls src={recordBlobLink} className="mt-6" /> : ""}
                </div>
            </div>
        </div>
    );
};

export default ReactAudio;