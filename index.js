// Password functionality
const overlay = document.getElementById("tap-to-play");
const button = document.getElementById("start-btn");
const passwordInput = document.getElementById("love-password");
const wrongMsg = document.getElementById("wrong-password");
const countdownPage = document.getElementById("countdown-page");
const anniversaryPage = document.getElementById("anniversary-page");
const correctPassword = "22062024"; // 22 June 2024
const bgMusic = document.getElementById("bg-music");

button.addEventListener("click", () => {
  if (passwordInput.value === correctPassword) {
    overlay.style.display = "none";
    countdownPage.classList.remove("hidden");

    // Play music after user interaction (works on mobile)
    if (bgMusic)
      bgMusic.play().catch(() => {
        console.log("Music blocked");
      });

    startCountdown();
  } else {
    wrongMsg.style.display = "block";
    passwordInput.value = "";
  }
});

passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") button.click();
});

// Countdown timer
const countdownTimer = document.getElementById("countdown-timer");
const targetDate = new Date(2025, 9, 22); // October = 9

function startCountdown() {
  const interval = setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      clearInterval(interval);
      alert("Happy Anniversary 💖 My love! You are my everything! 💕");
      countdownPage.classList.add("hidden");
      anniversaryPage.classList.remove("hidden");
      if (bgMusic)
        bgMusic.play().catch(() => {
          console.log("Music blocked");
        });
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
const startDate = new Date(2024, 5, 22);
const daysElem = document.getElementById("days-together");
const loveElem = document.getElementById("love-percentage");
const progressBar = document.getElementById("progress-bar");

function updateLoveStats() {
  if (!daysElem) return;
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
