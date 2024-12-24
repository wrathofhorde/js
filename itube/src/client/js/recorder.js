import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const preview = document.getElementById("preview");
const actionBtn = document.getElementById("actionBtn");

let stream = null;
let recorder = null;
let videofile = null;

const files = {
  input: "recording.mkv",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

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

const downloadFile = (url, filename) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
};

const handleDownloadRecording = async () => {
  actionBtn.innerText = "Transcoding";
  actionBtn.removeEventListener("click", handleDownloadRecording);
  actionBtn.disabled = true;

  const ffmpeg = new FFmpeg();
  await ffmpeg.load();
  ffmpeg.on("log", ({ type, message }) => {
    console.log(type);
    console.log(message);
  });

  await ffmpeg.writeFile(files.input, await fetchFile(videofile));
  await ffmpeg.exec(["-i", files.input, "-r", "60", files.output]);
  const mp4File = await ffmpeg.readFile(files.output);
  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const mp4Url = URL.createObjectURL(mp4Blob);

  downloadFile(mp4Url, "MyRecording.mp4");

  await ffmpeg.exec([
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb,
  ]);

  const jpgFile = await ffmpeg.readFile(files.thumb);
  const jpgBlob = new Blob([jpgFile.buffer], { type: "image/jpg" });
  const jpgUrl = URL.createObjectURL(jpgBlob);

  downloadFile(jpgUrl, "MyThumbnail.jpg");

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(jpgUrl);
  URL.revokeObjectURL(videofile);

  actionBtn.innerText = "Start recording";
  actionBtn.disabled = false;
  actionBtn.addEventListener("click", handleStartRecording);
};

const handleStartRecording = () => {
  actionBtn.disabled = true;
  actionBtn.innerText = "Recording";
  actionBtn.removeEventListener("click", handleStartRecording);

  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videofile = URL.createObjectURL(event.data);
    preview.srcObject = null;
    preview.src = videofile;
    preview.loop = true;
    preview.play();
    actionBtn.disabled = false;
    actionBtn.innerText = "Download recording";
    actionBtn.addEventListener("click", handleDownloadRecording);
  };
  recorder.start();

  setTimeout(() => {
    recorder.stop();
  }, 3000);
};

actionBtn.addEventListener("click", handleStartRecording);
