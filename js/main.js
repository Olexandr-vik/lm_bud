const videoElement = document.getElementById("bg-video");
const strip = document.querySelector(".strip");

// Масив відео
const videos = [
  { src: "video/intro-1.mp4", code: "intro-1" },
  { src: "video/intro-2.mp4", code: "intro-2" },
  { src: "video/intro-3.mp4", code: "intro-3" },
  { src: "video/intro-4.mp4", code: "intro-4" }
];

let currentIndex = -1;

function playRandomVideo() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * videos.length);
  } while (newIndex === currentIndex);

  currentIndex = newIndex;
  const currentVideo = videos[currentIndex];

  const tempVideo = document.createElement("video");
  tempVideo.src = currentVideo.src;

  tempVideo.onloadedmetadata = () => {
    const duration = tempVideo.duration;

    // Якщо відео коротше 2 секунд – пропускаємо
    if (duration <= 2) {
      playRandomVideo();
      return;
    }

    const randomStart = Math.random() * (duration - 2);

    videoElement.src = currentVideo.src;
    videoElement.currentTime = randomStart;
    videoElement.classList.remove("opacity-0");
    videoElement.classList.add("opacity-100");
    videoElement.play();
  };
}

const directions = ["up", "down", "diagonal"];
const animationDuration = 1000; // ms

function startTransition() {
  const dir = directions[Math.floor(Math.random() * directions.length)];
  strip.classList.add(dir);

  setTimeout(() => {
    playRandomVideo();
  }, animationDuration / 2);

  strip.addEventListener(
    "animationend",
    () => {
      strip.className = "strip";
      scheduleNext();
    },
    { once: true }
  );
}

function scheduleNext() {
  setTimeout(startTransition, 2000);
}

playRandomVideo();
scheduleNext();

