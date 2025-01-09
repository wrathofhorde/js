const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const timeline = document.getElementById("timeline");
const volumeRange = document.getElementById("volume");
const totalTime = document.getElementById("totalTime");
const currentTime = document.getElementById("currentTime");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenIcon = fullScreenBtn.querySelector("i");
const videoControls = document.getElementById("videoControls");
const videoContainer = document.getElementById("videoContainer");

const defaultVolume = 0.5;
let controlsTimeout = null;
let controlsMovementTimeout = null;

video.volume = defaultVolume;

const videoPlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }

  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

playBtn.addEventListener("click", videoPlay);

video.addEventListener("click", videoPlay);

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    videoPlay();
  }
});

muteBtn.addEventListener("click", (event) => {
  video.muted = !video.muted;
  //   console.log(video.volume);
  //   volumeRange.value = video.muted ? 0 : 0.5;
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
});

volumeRange.addEventListener("input", (event) => {
  const {
    target: { value },
  } = event;

  video.volume = value;
  // console.log(value, typeof value);
  muteBtnIcon.classList =
    value === "0" ? "fas fa-volume-mute" : "fas fa-volume-up";
});

const formatTime = (seconds) => {
  const ms = 1000;
  const time = new Date(parseFloat(seconds) * ms).toISOString();
  //   console.log(time);
  //   '1970-01-01T00:00:10.000Z'
  const start = time.indexOf("T") + 4;
  const end = time.indexOf(".", start);

  return time.substring(start, end);
};

video.addEventListener("loadeddata", () => {
  timeline.max = Math.floor(video.duration);
  totalTime.innerText = formatTime(video.duration);
  currentTime.innerText = formatTime(video.currentTime);
});

video.addEventListener("timeupdate", () => {
  timeline.value = Math.floor(video.currentTime);
  currentTime.innerText = formatTime(video.currentTime);
});

video.addEventListener("ended", async () => {
  const { id } = videoContainer.dataset;
  const response = await fetch(`/api/videos/${id}/view`, {
    method: "POST",
  });

  if (response.status !== 200) {
    console.log("fetch error");
    return;
  }

  video.currentTime = 0;
  timeline.value = Math.floor(video.currentTime);
  currentTime.innerText = formatTime(video.currentTime);
  playBtnIcon.classList = "fas fa-play";
});

const videoControlsClasName = "showing";
const removeClassName = () =>
  videoControls.classList.remove(videoControlsClasName);

video.addEventListener("mousemove", () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }

  videoControls.classList.add(videoControlsClasName);
  controlsMovementTimeout = setTimeout(removeClassName, 3000);
});

video.addEventListener("mouseleave", () => {
  controlsTimeout = setTimeout(removeClassName, 3000);
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
    fullScreenIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenIcon.classList = "fas fa-compress";
  }
});
