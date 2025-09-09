const videoElement = document.getElementById("bg-video");
const indicator = document.getElementById("video-indicator");

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

    // Індикатор
    indicator.innerHTML = `
      <div>${(currentIndex+1).toString().padStart(2, '0')} / ${videos.length}</div>
      <div class="text-xs text-gray-300">${currentVideo.code}</div>
    `;

    setTimeout(() => {
      videoElement.classList.remove("opacity-100");
      videoElement.classList.add("opacity-0");
      setTimeout(playRandomVideo, 1000);
    }, 2000);
  };
}

playRandomVideo();
