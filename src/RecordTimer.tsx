// import { useState } from "react";
// import useRecorderPermission from "./hooks/useRecorderPermission";

// const RecordTimer = () => {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   let myInterval = 0;
//   const [isRecording, setIsRecording] = useState(false);
//   const [seconds, setSeconds] = useState(5);
//   const recorder = useRecorderPermission();

//   const triggerTimer = async () => {
//     myInterval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds((prev) => prev - 1);
//       }
//     }, 1000);
//   };

//   const addAudioElement = (blob: Blob | MediaSource) => {
//     console.log("called", blob);
//     const url = URL.createObjectURL(blob);
//     const audio = document.createElement("audio");
//     audio.src = url;
//     audio.controls = true;
//     const main: HTMLDivElement | null = document.getElementById(
//       "main"
//     ) as HTMLDivElement;
//     main.appendChild(audio);
//     // generateAudioTranscript(blob as Blob);
//   };

//   const resetTimer = () => {
//     clearInterval(myInterval);
//     setSeconds(5);
//   };

//   const stopRecording = async () => {
//     setIsRecording(false);
//     await recorder.stopRecording();
//     const blob = recorder.getBlob();
//     resetTimer();
//     addAudioElement(blob);
//   };

//   const startRecording = async () => {
//     setIsRecording(true);
//     await triggerTimer();
//     recorder.startRecording();
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const sleep = (m: any) =>
//       new Promise((r) => {
//         setTimeout(r, m);
//       });
//     await sleep(5000);
//     await stopRecording();
//   };

//   return <></>;
// };

// export default RecordTimer;
