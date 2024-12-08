// import { useEffect, useState } from "react";
// import RecordRTC, { RecordRTCPromisesHandler } from "recordrtc";

// const useRecorderPermission = (recordingType: RecordRTC.Options["type"]) => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [recorder, setRecorder] = useState<any>();

//   const getPermissionInitializeRecorder = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
//     const newRecorder = new RecordRTCPromisesHandler(stream, {
//       type: recordingType,
//     });
//     setRecorder(newRecorder);
//   };

//   useEffect(() => {
//     getPermissionInitializeRecorder();
//   }, []);

//   return recorder;
// };

// export default useRecorderPermission;
