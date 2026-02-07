const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

const noVideo = document.getElementById('noVideo');
const redirectBtn = document.getElementById('redirectBtn');

const questionSection = document.getElementById('question-section');
const gifSection = document.getElementById('gif-section');

const videoModal = document.getElementById('videoModal');

const REDIRECT_URL = './yes.html';

function launchConfetti() {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

yesBtn.addEventListener('click', () => {
    fetch('https://gf-proposal-phi.vercel.app/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: "ksjmyeza@gmail.com",
            to_name: "Katleho Myeza",
            from_name: "Felleng Lehula",
            message: "She said YES! 🎉"
        })
    })
    .then(() => {
        showGif();
    })
    .catch((err) => {
        console.error("Email error:", err);
        showGif();
    });
});

noBtn.addEventListener('click', () => {
    videoModal.style.display = 'flex';
    noVideo.currentTime = 0;
    noVideo.play();
});

noVideo.addEventListener('ended', () => {
    videoModal.style.display = 'none';
    noVideo.pause();
});

function showGif() {
    questionSection.style.display = 'none';
    gifSection.style.display = 'block';
    redirectBtn.style.display = 'inline-block';

    launchConfetti();
}

function redirect() {
    window.location.href = REDIRECT_URL;
}

redirectBtn.addEventListener('click', redirect);
