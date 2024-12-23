import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const preview = document.getElementById("preview");
const startBtn = document.getElementById("startBtn");

let stream = null;
let recorder = null;
let videofile = null;

const init = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    preview.srcObject = stream;
    preview.play();
  } catch (e) {
    console.log(e);
  }
};

init();

const handleDownloadRecording = async () => {
  const inputFile = "recording.mkv";
  const outputFile = "output.mp4";

  const ffmpeg = new FFmpeg();
  await ffmpeg.load({ log: true });
  await ffmpeg.writeFile(inputFile, await fetchFile(videofile));
  await ffmpeg.exec(["-i", inputFile, "-r", "60", outputFile]);
  await ffmpeg.exec([
    "-i",
    inputFile,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg",
  ]);
  const mp4File = await ffmpeg.readFile(outputFile);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4";
  document.body.appendChild(a);
  a.click();

  startBtn.innerText = "Start recording";
  startBtn.removeEventListener("click", handleDownloadRecording);
  startBtn.addEventListener("click", handleStartRecording);
};

const handleStartRecording = () => {
  startBtn.innerText = "Stop recording";
  startBtn.removeEventListener("click", handleStartRecording);
  startBtn.addEventListener("click", handleStopRecording);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videofile = URL.createObjectURL(event.data);
    preview.srcObject = null;
    preview.src = videofile;
    preview.loop = true;
    preview.play();
  };
  recorder.start();
};

const handleStopRecording = () => {
  startBtn.innerText = "Download recording";
  startBtn.removeEventListener("click", handleStopRecording);
  startBtn.addEventListener("click", handleDownloadRecording);

  recorder.stop();
};

startBtn.addEventListener("click", handleStartRecording);
