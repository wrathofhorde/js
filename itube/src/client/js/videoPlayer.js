const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");
const timeline = document.getElementById("timeline");
const videoContainer = document.getElementById("videoContainer");
const fullScreenBtn = document.getElementById("fullScreen");

const defaultVolume = 0.5;
video.volume = defaultVolume;

playBtn.addEventListener("click", (event) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtn.innerText = video.paused ? "Play" : "Pause";
});

muteBtn.addEventListener("click", (event) => {
  video.muted = !video.muted;
  //   console.log(video.volume);
  //   volumeRange.value = video.muted ? 0 : 0.5;
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
});

volumeRange.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;

  video.volume = value;
  console.log(value, typeof value);
  muteBtn.innerText = value === "0" ? "Unmute" : "Mute";
});

const formatTime = (seconds) => {
  const ms = 1000;
  const time = new Date(parseFloat(seconds) * ms).toISOString();
  //   console.log(time);
  //   '1970-01-01T00:00:10.000Z'
  const start = time.indexOf("T") + 1;
  const end = time.indexOf(".", start);

  return time.substring(start, end);
};

video.addEventListener("loadedmetadata", () => {
  timeline.max = Math.floor(video.duration);
  totalTime.innerText = formatTime(video.duration);
  currentTime.innerText = formatTime(video.currentTime);
});

video.addEventListener("timeupdate", () => {
  timeline.value = Math.floor(video.currentTime);
  currentTime.innerText = formatTime(video.currentTime);
});

timeline.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;

  video.currentTime = value;
});

fullScreenBtn.addEventListener("click", () => {
  const fullscreen = document.fullscreenElement;

  if (fullscreen) {
    document.exitFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
});
