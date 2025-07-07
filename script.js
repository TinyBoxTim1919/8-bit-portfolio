
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
