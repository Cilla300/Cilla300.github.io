let chaos = 0;
let isRecording = false;
let instruments = document.getElementById('instrumentsGrid');
let recordingTimeout;
let discoMode = false;
let gravityOff = false;

// Weird sounds library (text representations since we can't use real audio in artifacts)
const weirdSounds = {
    cow: "MOOOOO! 🐄",
    goat: "MAAAAH! 🐐",
    sheep: "BAAAAH! 🐑",
    pig: "OINK OINK! 🐷",
    duck: "QUACK! 🦆",
    chicken: "CLUCK CLUCK! 🐔",
    horse: "NEIGH! 🐴",
    dog: "WOOF! 🐕",
    cat: "MEOW! 🐱",
    frog: "RIBBIT! 🐸",
    owl: "HOOT! 🦉",
    elephant: "TRUMPET! 🐘",
    beep: "BEEP! 🤖",
    boop: "BOOP! 🤖",
    buzz: "BZZZZ! ⚡",
    whir: "WHIRRR! 🌪",
    zap: "ZAP! ⚡",
    ping: "PING! 📡"
};

function toggleInstruments() {
    instruments.style.display = instruments.style.display === 'grid' ? 'none' : 'grid';
    addChaos();
}

function showPiano() {
    hideAllInstruments();
    document.getElementById('piano').style.display = 'block';
    addChaos();
}

function showDrums() {
    hideAllInstruments();
    document.getElementById('drums').style.display = 'block';
    addChaos();
}

function showGuitar() {
    hideAllInstruments();
    alert("🎸 Guitar activated! But it only plays elevator music backwards! 🎵↩");
    addChaos();
}

function showTrumpet() {
    hideAllInstruments();
    alert("🎺 Trumpet activated! It now sounds like a dying whale! 🐋💀");
    addChaos();
}

function hideAllInstruments() {
    document.getElementById('piano').style.display = 'none';
    document.getElementById('drums').style.display = 'none';
}

function playWeirdSound(soundType) {
    const sound = weirdSounds[soundType];

    // Create floating text effect
    const floatingText = document.createElement('div');
    floatingText.textContent = sound;
    floatingText.style.position = 'fixed';
    floatingText.style.left = Math.random() * window.innerWidth + 'px';
    floatingText.style.top = Math.random() * window.innerHeight + 'px';
    floatingText.style.fontSize = '2rem';
    floatingText.style.zIndex = '1000';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.animation = 'bounce 1s ease-out forwards';

    document.body.appendChild(floatingText);

    setTimeout(() => {
        document.body.removeChild(floatingText);
    }, 1000);

    addChaos();
}

function toggleRecording() {
    const recordBtn = document.getElementById('recordBtn');
    const status = document.getElementById('recordStatus');

    if (!isRecording) {
        isRecording = true;
        recordBtn.classList.add('recording');
        recordBtn.innerHTML = '⏹<br>STOP';
        status.textContent = 'Recording your beautiful voice... (converting to weird sounds)';

        // Simulate weird recording process
        recordingTimeout = setTimeout(() => {
            stopRecording();
        }, 5000);
    } else {
        stopRecording();
    }
    addChaos();
}

function stopRecording() {
    isRecording = false;
    const recordBtn = document.getElementById('recordBtn');
    const status = document.getElementById('recordStatus');

    recordBtn.classList.remove('recording');
    recordBtn.innerHTML = '🎤<br>SING';

    clearTimeout(recordingTimeout);

    // Show "playback" of weird sounds
    const weirdResults = [
        "🤖 BEEP BOOP BEEP (was 'Hello')",
        "🐄 MOOO MOOO MOO (was 'How are you')",
        "🦆 QUACK QUACK QUACK (was 'I love music')",
        "🐸 RIBBIT RIBBIT (was 'This is fun')"
    ];

    const randomResult = weirdResults[Math.floor(Math.random() * weirdResults.length)];
    status.textContent = `Playback: ${randomResult}`;

    setTimeout(() => {
        status.textContent = 'Ready to destroy your voice again!';
    }, 3000);
}

function addChaos() {
    chaos += 10;
    if (chaos > 100) chaos = 100;

    const chaosLevel = document.getElementById('chaosLevel');
    const chaosText = document.getElementById('chaosText');

    chaosLevel.style.width = chaos + '%';

    if (chaos < 30) {
        chaosText.textContent = 'Chaos Level: Surprisingly Normal';
    } else if (chaos < 60) {
        chaosText.textContent = 'Chaos Level: Getting Weird';
    } else if (chaos < 90) {
        chaosText.textContent = 'Chaos Level: Total Mayhem';
    } else {
        chaosText.textContent = 'Chaos Level: REALITY IS BREAKING';
        if (chaos === 100) {
            activateMaxChaos();
        }
    }
}

function activateMaxChaos() {
    document.body.style.animation = 'gradientShift 0.5s ease infinite';
    setTimeout(() => {
        document.body.style.animation = 'gradientShift 15s ease infinite';
    }, 3000);
}

function summonRainbow() {
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    document.body.style.background = `linear-gradient(45deg, ${colors.join(', ')})`;

    setTimeout(() => {
        document.body.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)';
    }, 5000);
    addChaos();
}

function toggleGravity() {
    gravityOff = !gravityOff;
    const cards = document.querySelectorAll('.feature-card');

    if (gravityOff) {
        cards.forEach((card, index) => {
            card.style.animation = `float ${2 + index * 0.5}s ease-in-out infinite`;
        });
    } else {
        cards.forEach(card => {
            card.style.animation = 'none';
        });
    }
    addChaos();
}

function activateDiscoMode() {
    discoMode = !discoMode;
    const body = document.body;

    if (discoMode) {
        body.style.animation = 'gradientShift 0.2s ease infinite';
        alert('🕺 DISCO MODE ACTIVATED! 🕺');
    } else {
        body.style.animation = 'gradientShift 15s ease infinite';
        alert('😴 Disco mode deactivated... boring!');
    }
    addChaos();
}

function makeEverythingWiggle() {
    const everything = document.querySelectorAll('*');
    everything.forEach(element => {
        element.style.animation = 'bounce 0.5s ease infinite';
    });

    setTimeout(() => {
        everything.forEach(element => {
            if (!element.classList.contains('header')) {
                element.style.animation = 'none';
            }
        });
    }, 3000);
    addChaos();
}

function secretFeature() {
    document.getElementById('modal').style.display = 'flex';
    chaos = 100;
    addChaos();
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Add some CSS for the float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-20px) rotate(2deg); }
        50% { transform: translateY(-10px) rotate(-1deg); }
        75% { transform: translateY(-15px) rotate(1deg); }
    }
`;
document.head.appendChild(style);

// Random chaos events
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every 3 seconds
        const randomEvents = [
            () => alert('🎪 Random chaos event: A wild accordion appears!'),
            () => document.body.style.transform = 'rotate(1deg)',
            () => setTimeout(() => document.body.style.transform = 'rotate(0deg)', 1000)
        ];
        const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        randomEvent();
    }
}, 3000);