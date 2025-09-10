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

// Ефект переходу між відео
function startTransition() {
  const oldVideo = document.getElementById('old-video');
  const bar = document.getElementById('transition-bar');
  let progress = 0;
  const duration = 2000; // мс
  const fps = 60;
  const step = 1000 / fps;
  const height = oldVideo.offsetHeight;

  function animate() {
    progress += step;
    const percent = Math.min(progress / duration, 1);
    const px = Math.floor(height * (1 - percent));
    oldVideo.style.clipPath = `inset(0 0 ${px}px 0)`;
    bar.style.bottom = `${px}px`;
    if (percent < 1) {
      requestAnimationFrame(animate);
    } else {
      oldVideo.style.display = 'none';
      bar.style.display = 'none';
    }
  }
  animate();
}

// Автоматичний запуск ефекту при завантаженні сторінки (для демонстрації)
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(startTransition, 1000); // Затримка для старту ефекту
});

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

