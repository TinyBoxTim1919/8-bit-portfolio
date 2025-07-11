if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}


function playSound() {
    const sound = document.getElementById("click-sound");
    sound.currentTime = 0;
    sound.play();
}

function startSplash() {
    const splashSound = document.getElementById("splash-sound");
    splashSound.volume = 1;
    splashSound.play();

    const splash = document.getElementById('splash-screen');
    splash.style.transition = 'opacity 1s ease';
    splash.style.opacity = 0;

    setTimeout(() => splash.remove(), 1000);
}

window.addEventListener('load', () => {
    // After 3 seconds, hide loading text, show start button
    setTimeout(() => {
        document.getElementById('loading-text').style.display = 'none';
        document.getElementById('start-button').style.display = 'inline-block';
    }, 3000);
});

function refreshPage() {
    const sound = document.getElementById("click-sound");
    sound.currentTime = 0;
    sound.play();

    // Scroll to top before reload
    window.scrollTo(0, 0);

    setTimeout(() => {
        // Reload after scrolling to top
        location.reload();
    }, 300); // wait for sound to play
}


const tracks = [
  { name: "A Hero Of The 80's", src: "assets/A-Hero-Of-The-80's.mp3"},
  { name: "8-Bit Adventure", src: "assets/8-Bit-Adventure.mp3" },
  { name: "A Bit of Hope", src: "assets/A-Bit-Of-Hope.mp3" },
  { name: "Boss Time", src: "assets/Boss-Time.mp3" },
  { name: "Land Of 8-Bits", src: "assets/Land-of-8-bits.mp3" },
  { name: "8-Bit Smooth Presentation", src: "assets/8bit-smooth-presentation.mp3" },
  { name: "Death By Glamour", src: "assets/Death-By-Glamour.mp3"},
  { name: "Boss Fight", src: "assets/Boss-Music.mp3"},
  { name: "Lady Of the 80's", src: "assets/Lady-Of-The-80's.mp3"}
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = document.getElementById("bg-music");
const trackName = document.getElementById("track-name");
const playPauseBtn = document.getElementById("play-pause-btn");

function loadTrack(index) {
  audio.pause();
  audio.src = tracks[index].src;
  trackName.textContent = "Track: " + tracks[index].name;

  // Auto-play if already playing
  if (isPlaying) {
    audio.load();
    audio.play().then(() => {
      playPauseBtn.textContent = "⏸";
    }).catch((err) => {
      console.error("Playback failed:", err);
      playPauseBtn.textContent = "▶";
      isPlaying = false;
    });
  } else {
    playPauseBtn.textContent = "▶";
  }
}

function toggleMusic() {
  if (audio.paused) {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  }
}

function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
}

function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
}

// Auto-next when song ends
audio.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    audio.play(); // keep playback going
  }
});

// Initial setup
window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentTrackIndex);
});
