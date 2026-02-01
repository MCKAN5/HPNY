/* ===== ELEMENTS ===== */
const countdownEl = document.getElementById("countdown");
const textContainer = document.getElementById("textContainer");
const tickSound = document.getElementById("tickSound");
const music = document.getElementById("bgMusic");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

/* ===== COUNTDOWN ===== */
let time = 10;

// mở web là đếm ngay
window.addEventListener("load", () => {
  startCountdown();
});

function startCountdown() {
  countdownEl.textContent = time;

  const timer = setInterval(() => {
    // cố gắng phát tick (nếu bị chặn thì thôi)
    tickSound.currentTime = 0;
    tickSound.play().catch(() => {});

    countdownEl.textContent = time;
    time--;

    if (time < 0) {
      clearInterval(timer);

      tickSound.pause();
      tickSound.currentTime = 0;

      countdownEl.style.display = "none";

      // bật nhạc chúc mừng (nếu được phép)
      music.play().catch(() => {});

      startShow();
    }
  }, 1000);
}

/* ===== SHOW CHÍNH ===== */
function startShow() {
  canvas.style.display = "block";
  startFireworks();

  document.querySelectorAll(".photo").forEach((p) => {
    p.style.display = "block";
  });

  textContainer.style.display = "block";
  createTexts();
}

/* ===== CHỮ CHẠY NGẪU NHIÊN ===== */
function createTexts() {
  setInterval(() => {
    const div = document.createElement("div");
    div.className = "text";
    div.textContent = "🎉 Chúc Mừng Năm Mới 2026 🎉";

    div.style.left = Math.random() * 70 + "%";
    div.style.fontFamily = Math.random() > 0.5 ? "Pacifico" : "Dancing Script";

    textContainer.appendChild(div);
    setTimeout(() => div.remove(), 7000);
  }, 600);
}

/* ===== FIREWORKS ===== */
let particles = [];

function startFireworks() {
  setInterval(() => {
    let x = Math.random() * canvas.width;
    let y = (Math.random() * canvas.height) / 2;

    for (let i = 0; i < 50; i++) {
      particles.push({
        x,
        y,
        dx: Math.random() * 6 - 3,
        dy: Math.random() * 6 - 3,
        life: 100,
      });
    }
  }, 500);

  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    ctx.fillStyle = `hsl(${Math.random() * 360},100%,60%)`;
    ctx.fillRect(p.x, p.y, 3, 3);

    if (p.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
