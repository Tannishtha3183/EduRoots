function goTo(page) {
  window.location.href = page; // replace with window.location.href = page;
}

// --- Daily Reward ---
function openChest() {
  showConfetti();
  document.getElementById('reward-msg').textContent = "You got 2 ⭐ hints today!";
  setTimeout(() => {
    document.getElementById('reward-msg').textContent = "";
  }, 3000);
}

// Confetti animation (stops after 4 seconds)
function showConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let pieces = new Array(100).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    size: 5 + Math.random() * 5,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`,
    speed: 2 + Math.random() * 3
  }));

  let startTime = Date.now();

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.speed;
      if (p.y > canvas.height) p.y = -10;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });
    if (Date.now() - startTime < 4000) { // stop after 4 sec
      requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  update();
}

// --- Quiz Logic ---
const quiz = {
  question: "Select the odd one out !",
  options: ["Earth","Cloud","Jupiter","Mars"],
  correct: 1
};

document.getElementById('quiz-question').textContent = quiz.question;
const optionsContainer = document.getElementById('quiz-options');

quiz.options.forEach((opt, i) => {
  const btn = document.createElement('button');
  btn.textContent = opt;
  btn.className = 'quiz-option';
  btn.onclick = () => checkAnswer(i);
  optionsContainer.appendChild(btn);
});

function checkAnswer(i) {
  const result = document.getElementById('quiz-result');
  if (i === quiz.correct) {
    result.textContent = "✅ Correct!";
    result.style.color = "green";
  } else {
    result.textContent = "❌ Try again!";
    result.style.color = "red";
  }
}
