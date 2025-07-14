// This keeps the page from jumping back to where you were after reloading
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// This plays a clicking sound (like a UI sound) when called
function playSound() {
    const sound = document.getElementById("click-sound");
    sound.currentTime = 0; // Reset sound to start
    sound.play(); // Play the sound
}

// This starts the splash screen effect and plays its sound
function startSplash() {
    const splashSound = document.getElementById("splash-sound");
    splashSound.volume = 1; // Set volume to full
    splashSound.play(); // Play splash sound

    const splash = document.getElementById('splash-screen');
    splash.style.transition = 'opacity 1s ease'; // Fade out smoothly
    splash.style.opacity = 0; // Make it transparent

    // Wait 1 second then completely remove the splash from the page
    setTimeout(() => splash.remove(), 1000);
}

// When the window fully loads...
window.addEventListener('load', () => {
    // Wait 3 seconds then hide the loading text and show the start button
    setTimeout(() => {
        document.getElementById('loading-text').style.display = 'none';
        document.getElementById('start-button').style.display = 'inline-block';
    }, 3000);
});

// Refresh button sound and animation
function refreshPage() {
    const sound = document.getElementById("click-sound");
    sound.currentTime = 0;
    sound.play();

    window.scrollTo(0, 0); // Scroll to top of page

    // Reload the page after a short delay so the sound can finish
    setTimeout(() => {
        location.reload();
    }, 300);
}

// This is your music playlist
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

let currentTrackIndex = 0; // Start with first song
let isPlaying = false; // Keep track if music is playing or not
const audio = document.getElementById("bg-music"); // Audio element on page
const trackName = document.getElementById("track-name"); // Displays song name
const playPauseBtn = document.getElementById("play-pause-btn"); // Play/Pause button

// Load and display a track by index
function loadTrack(index) {
  audio.pause(); // Stop whatever is currently playing
  audio.src = tracks[index].src; // Set new song
  trackName.textContent = "Track: " + tracks[index].name; // Update name

  if (isPlaying) {
    audio.load(); // Load new track
    audio.play().then(() => {
      playPauseBtn.textContent = "⏸"; // Show pause symbol
    }).catch((err) => {
      console.error("Playback failed:", err); // Show error if audio fails
      playPauseBtn.textContent = "▶"; // Reset button icon
      isPlaying = false;
    });
  } else {
    playPauseBtn.textContent = "▶"; // Show play symbol
  }
}

// Start or pause music
function toggleMusic() {
  if (audio.paused) {
    audio.play(); // Start playing
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  } else {
    audio.pause(); // Pause playing
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  }
}

// Go to next track in playlist
function nextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
}

// Go to previous track in playlist
function prevTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
}

// When a track ends, go to the next one (but playback only continues if user pressed play)
audio.addEventListener("ended", () => {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  loadTrack(currentTrackIndex);
  if (isPlaying) {
    audio.play(); // Try to keep playing next track
  }
});

// When the page is fully ready, load the first track
window.addEventListener("DOMContentLoaded", () => {
  loadTrack(currentTrackIndex);
});
