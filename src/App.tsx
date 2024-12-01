import uitoolkit from "@zoom/videosdk-ui-toolkit";

import "./App.css";

import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import { useRef } from "react";
import { getAudioTranscript } from "./services";

function App() {
  let sessionContainer: HTMLDivElement | null = null;
  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.table(err) // onNotAllowedOrFound
  );

  const intervalId = useRef(1234);

  // const generateAudioTranscript = async (audio: Blob) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", audio);
  //     const response = await getAudioTranscript(formData);
  //     console.log({ response });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const addAudioElement = (blob: Blob | MediaSource) => {
    console.log("called", blob);
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    const main: HTMLDivElement | null = document.getElementById(
      "main"
    ) as HTMLDivElement;
    main.appendChild(audio);
    // generateAudioTranscript(blob as Blob);
  };

  const authEndpoint = "http://localhost:4000";
  const config = {
    videoSDKJWT: "",
    sessionName: "test",
    userName: "React",
    sessionPasscode: "123",
    features: ["video", "audio", "settings", "users", "chat", "share"],
    options: { init: {}, audio: {}, video: {}, share: {} },
    // virtualBackground: {
    //   allowVirtualBackground: true,
    //   allowVirtualBackgroundUpload: true,
    //   virtualBackgrounds: [
    //     "https://images.unsplash.com/photo-1715490187538-30a365fa05bd?q=80&w=1945&auto=format&fit=crop",
    //   ],
    // },
  };
  const role = 1;

  const getVideoSDKJWT = () => {
    sessionContainer = document.getElementById(
      "sessionContainer"
    ) as HTMLDivElement;
    document.getElementById("join-flow")!.style.display = "none";
    fetch(authEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sessionName: config.sessionName, role: role }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.signature) {
          config.videoSDKJWT = data.signature;
          joinSession();
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const startAudioRecording = () => {
    console.log("start");
    recorderControls.startRecording();
    startAudioLoop();
  };

  const stopAudioRecording = () => {
    console.log("stop");
    recorderControls.stopRecording();
  };

  const startAudioLoop = () => {
    intervalId.current = setInterval(() => {
      clearInterval(intervalId.current);
      stopAudioRecording();
      startAudioRecording();
    }, 5000);
  };

  function joinSession() {
    if (sessionContainer) {
      uitoolkit.joinSession(sessionContainer, config);
      startAudioRecording();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      sessionContainer && uitoolkit.onSessionClosed(sessionClosed);
    }
  }

  const sessionClosed = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sessionContainer && uitoolkit.closeSession(sessionContainer);
    stopAudioRecording();
    document.getElementById("join-flow")!.style.display = "block";
  };

  return (
    <div className="App">
      <main id="main">
        <div id="join-flow">
          <h1>Zoom Video SDK Sample React</h1>
          <p>User interface offered by the Video SDK UI Toolkit</p>
          <button onClick={getVideoSDKJWT}>Join Session</button>
        </div>
        <div id="sessionContainer"></div>
        <button onClick={sessionClosed}>Close Session</button>
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
        />
      </main>
    </div>
  );
}

export default App;
