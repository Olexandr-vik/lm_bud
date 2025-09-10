const videoElement = document.getElementById("bg-video");
const strip = document.querySelector(".strip");

// Масив відео
const videos = [
  "video/intro-1.mp4",
  "video/intro-2.mp4",
  "video/intro-3.mp4",
  "video/intro-4.mp4"
];

const videoMain = document.getElementById('video-main');
const videoNext = document.getElementById('video-next');
const bar = document.getElementById('transition-bar');

// Вибір випадкового відео
function getRandomVideo(exclude) {
  let filtered = videos.filter(v => v !== exclude);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

// Вибір випадкового часу (від 5 до 15 секунд)
function getRandomTime() {
  return Math.floor(Math.random() * 10000) + 5000;
}

// Ефект переходу (слайд знизу вверх)
function startTransition(nextSrc) {
  videoNext.src = nextSrc;
  videoNext.currentTime = 0;
  videoNext.style.display = 'block';
  bar.style.display = 'block';

  let progress = 0;
  const duration = 2000; // мс
  const fps = 60;
  const step = 1000 / fps;
  const height = videoMain.offsetHeight;

  function animate() {
    progress += step;
    const percent = Math.min(progress / duration, 1);
    const px = Math.floor(height * (1 - percent));
    videoMain.style.clipPath = `inset(0 0 ${px}px 0)`;
    bar.style.bottom = `${px}px`;
    if (percent < 1) {
      requestAnimationFrame(animate);
    } else {
      videoMain.src = nextSrc;
      videoMain.style.clipPath = 'inset(0 0 0 0)';
      videoNext.style.display = 'none';
      bar.style.display = 'none';
      scheduleNext();
    }
  }
  animate();
}

// Запуск першого відео
function startRandomVideo() {
  const first = getRandomVideo();
  videoMain.src = first;
  videoMain.onloadeddata = () => {
    scheduleNext();
  };
}

// Запланувати наступний перехід
function scheduleNext() {
  const next = getRandomVideo(videoMain.src);
  const time = getRandomTime();
  setTimeout(() => {
    startTransition(next);
  }, time);
}

// Ініціалізація
window.addEventListener('DOMContentLoaded', startRandomVideo);

