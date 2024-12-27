import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

const ffmpeg = new FFmpeg();
await ffmpeg.load();

ffmpeg.on("log", ({ type, message }) => {
  //   console.log(type);
  console.log(message);
});

const video = document.getElementById("video");
const thumb = document.getElementById("thumb");

video.addEventListener("change", async (event) => {});

thumb.addEventListener("change", async (event) => {});
