const envelope = document.getElementById("envelope");
const envelopeScreen = document.getElementById("envelopeScreen");
const letterScreen = document.getElementById("letterScreen");
const page = document.querySelector(".page");
const typedText = document.getElementById("typedText");
const cursor = document.getElementById("cursor");
const darkModeButton = document.getElementById("darkModeButton");
const bgMusic = document.getElementById("bgMusic");

let opened = false;

const letter = [
    {
        text: "I know we’ve had alot of conflicts in our rs, and we’ve been through some of our lowest moments. We’ve hurt each other, misunderstood each other, and had days where things felt so hard. But even through all of that, I want you to know that I will always love you.",
        pause: 1200
    },
    {
        text: "I may not always know the right words or the right way to show it, but my feelings for you are genuine. I still care about you even when we’re upset, and I’ll always want to understand you and make things better.",
        pause: 1200
    },
    {
        text: "No matter how many hard days we go through, I hope you never forget how much you mean to me. I love you, always. ❤️",
        pause: 1500
    },
    {
        text: "Forever yours, Jai 🤍",
        pause: 0
    }
];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeLine(text) {
    const line = document.createElement("div");

    line.className = "typing-line";

    typedText.appendChild(line);

    for (const char of text) {
        line.appendChild(
            document.createTextNode(char)
        );

        line.appendChild(cursor);

        await sleep(70);

        if (cursor.parentNode === line) {
            cursor.remove();
        }
    }

    line.appendChild(
        document.createTextNode("\u00a0")
    );

    line.appendChild(cursor);
}

async function startTyping() {
    await sleep(700);

    for (const item of letter) {
        await typeLine(item.text);
        await sleep(item.pause);
    }

    cursor.style.display = "none";
}

function openLetter() {
    if (opened) {
        return;
    }

    opened = true;

    bgMusic.volume = 0.35;
    bgMusic.currentTime = 0;

    bgMusic.play().catch(() => {});

    envelope.classList.add("opened");

    createHeartBurst();

    setTimeout(() => {
        envelopeScreen.classList.add("hide");
    }, 650);

    setTimeout(() => {
        letterScreen.classList.add("show");
        createFloatingHearts();
        startTyping();
    }, 1250);
}

function createHeartBurst() {
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement("span");

        heart.innerHTML =
            Math.random() > 0.4 ? "♥" : "♡";

        heart.style.position = "absolute";
        heart.style.left = "50%";
        heart.style.top = "50%";

        heart.style.color =
            Math.random() > 0.5
                ? "#c94d70"
                : "#e58ba0";

        heart.style.fontSize =
            `${Math.random() * 18 + 12}px`;

        heart.style.zIndex = "30";

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            Math.random() * 180 + 70;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        heart.animate(
            [
                {
                    opacity: 0,
                    transform:
                        "translate(-50%, -50%) scale(.2)"
                },
                {
                    opacity: 1,
                    transform:
                        "translate(-50%, -50%) scale(1)"
                },
                {
                    opacity: 0,
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        )
                        scale(.6)
                        rotate(180deg)`
                }
            ],
            {
                duration:
                    1100 + Math.random() * 400,
                easing:
                    "cubic-bezier(.22,1,.36,1)"
            }
        );

        page.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
}

function createFloatingHearts() {
    setInterval(() => {
        if (
            !letterScreen.classList.contains("show")
        ) {
            return;
        }

        const heart =
            document.createElement("span");

        heart.className =
            "floating-heart";

        heart.innerHTML =
            Math.random() > 0.5
                ? "♥"
                : "♡";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            Math.random() * 15 + 12 + "px";

        heart.style.animationDuration =
            Math.random() * 4 + 6 + "s";

        heart.style.setProperty(
            "--drift",
            `${Math.random() * 160 - 80}px`
        );

        page.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 11000);
    }, 900);
}

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {
        darkModeButton.textContent = "☀️";
    } else {
        darkModeButton.textContent = "🌙";
    }
});