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

const handleDownloadRecording = () => {
  const a = document.createElement("a");
  a.href = videofile;
  a.download = "MyRecording";
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
