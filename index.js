// Password functionality
const overlay = document.getElementById("tap-to-play");
const button = document.getElementById("start-btn");
const passwordInput = document.getElementById("love-password");
const wrongMsg = document.getElementById("wrong-password");
const correctPassword = "22062024";

const countdownPage = document.getElementById("countdown-page");
const anniversaryPage = document.getElementById("anniversary-page");
const countdownTimer = document.getElementById("countdown-timer");

button.addEventListener("click", () => {
  if (passwordInput.value === correctPassword) {
    overlay.style.display = "none";
    countdownPage.style.display = "block";
    startCountdown();
  } else {
    wrongMsg.style.display = "block";
    passwordInput.value = "";
  }
});

passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") button.click();
});

// Countdown to 22 Oct 2025
function startCountdown() {
  const anniversaryDate = new Date(2025, 9, 22, 0, 0, 0); // October=9
  const timerInterval = setInterval(() => {
    const now = new Date();
    const diff = anniversaryDate - now;

    if (diff <= 0) {
      clearInterval(timerInterval);
      countdownPage.style.display = "none";
      anniversaryPage.style.display = "block";
      startLoveStats();
      startFloating();
      playMusic();
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    countdownTimer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}

// Love counter & progress
function startLoveStats() {
  const startDate = new Date(2024, 5, 22);
  const daysElem = document.getElementById("days-together");
  const loveElem = document.getElementById("love-percentage");
  const progressBar = document.getElementById("progress-bar");

  function updateLoveStats() {
    const today = new Date();
    let years = today.getFullYear() - startDate.getFullYear();
    let months = today.getMonth() - startDate.getMonth();
    let days = today.getDate() - startDate.getDate();
    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    daysElem.textContent = `Together: ${years}y ${months}m ${days}d`;

    const anniversaryThisYear = new Date(
      today.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    const nextAnniversary = new Date(
      today.getFullYear() + 1,
      startDate.getMonth(),
      startDate.getDate()
    );
    const totalTime = nextAnniversary - anniversaryThisYear;
    const passedTime = today - anniversaryThisYear;
    const percentage = Math.floor((passedTime / totalTime) * 100);
    loveElem.textContent = `Love: ${percentage}%`;
    progressBar.style.width = percentage + "%";
  }
  updateLoveStats();
  setInterval(updateLoveStats, 1000 * 60 * 60);
}

// Floating hearts & flowers
function startFloating() {
  setInterval(() => {
    const elem = document.createElement("div");
    const isFlower = Math.random() < 0.3;
    elem.className = "floating " + (isFlower ? "flower" : "heart");
    const size = 10 + Math.random() * 25;
    elem.style.width = elem.style.height = size + "px";
    elem.style.left = Math.random() * window.innerWidth + "px";
    if (!isFlower)
      elem.style.backgroundColor = `rgba(255,${Math.floor(
        Math.random() * 150
      )},${Math.floor(Math.random() * 150)},${0.7 + Math.random() * 0.3})`;
    document.body.appendChild(elem);
    const speed = 4000 + Math.random() * 4000;
    elem.animate(
      [
        { transform: "translateY(0) scale(1)", opacity: 1 },
        {
          transform: `translateY(-${window.innerHeight + 100}px) scale(${
            0.5 + Math.random()
          })`,
          opacity: 0,
        },
      ],
      { duration: speed, easing: "linear" }
    );
    setTimeout(() => elem.remove(), speed);
  }, 300);
}

// Play background music
function playMusic() {
  document.getElementById("bg-music").play();
}
