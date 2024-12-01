import axios from "axios";

export const getAudioTranscript = (data: FormData) => {
  const url = "http://3.6.89.217:5000/api/transcripts/audios";
  return axios.post(url, data);
};
