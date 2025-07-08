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
  { name: "8-Bit Adventure", src: "8-Bit-Adventure.mp3" },
  { name: "A Bit of Hope", src: "A-Bit-Of-Hope.mp3" },
  { name: "Boss Time", src: "Boss-Time.mp3" },
  { name: "Land Of 8-Bits", src: "Land-of-8-bits.mp3" },
  { name: "8-Bit Smooth Presentation ", src: "8bit-smooth-presentation.mp3" }
];

let currentTrackIndex = 0;
let isPlaying = false;
const audio = document.getElementById("bg-music");
const trackName = document.getElementById("track-name");
const playPauseBtn = document.getElementById("play-pause-btn");

function loadTrack(index) {
  audio.src = tracks[index].src;
  trackName.textContent = "Track: " + tracks[index].name;

  if (isPlaying) {
    audio.play();
    console.log
    playPauseBtn.textContent = "⏸"; // Make sure the play button is accurate
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

// Load the first track when page loads
window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentTrackIndex);
});
