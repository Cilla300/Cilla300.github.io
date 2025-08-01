// Weird Music Maker - The Ultimate Useless Music App
// Global variables
let isRecording = false;
let mediaRecorder;
let audioChunks = [];
let recordedAudio;
let chaosLevel = 0;
let isChaosMode = false;
let playingSounds = [];
let achievements = [];
let soundsPlayed = 0;
let effectsApplied = 0;

// Animal sound frequencies and effects
const animalSounds = {
    cow: { baseFreq: 200, pattern: 'moo', description: 'Deep cow mooing with reverb' },
    sheep: { baseFreq: 400, pattern: 'baa', description: 'Sheep bleating with echo' },
    pig: { baseFreq: 300, pattern: 'oink', description: 'Pig snorting with distortion' },
    chicken: { baseFreq: 800, pattern: 'cluck', description: 'Chicken clucking staccato' },
    duck: { baseFreq: 600, pattern: 'quack', description: 'Duck quacking with vibrato' },
    cat: { baseFreq: 900, pattern: 'meow', description: 'Cat meowing with whiskers' },
    dog: { baseFreq: 250, pattern: 'woof', description: 'Dog barking with tail wag' },
    horse: { baseFreq: 150, pattern: 'neigh', description: 'Horse neighing majestically' },
    goat: { baseFreq: 350, pattern: 'bleat', description: 'Goat bleating chaotically' },
    elephant: { baseFreq: 100, pattern: 'trumpet', description: 'Elephant trumpeting loudly' },
    lion: { baseFreq: 120, pattern: 'roar', description: 'Lion roaring dominantly' },
    monkey: { baseFreq: 700, pattern: 'ooh', description: 'Monkey chattering wildly' }
};

// Achievement definitions
const achievementDefs = [
    { id: 'first_sound', icon: '🎵', title: 'First Moo', desc: 'Play your first animal sound', condition: () => soundsPlayed >= 1 },
    { id: 'chaos_master', icon: '🌪️', title: 'Chaos Master', desc: 'Activate chaos mode', condition: () => isChaosMode },
    { id: 'sound_spammer', icon: '🔊', title: 'Sound Spammer', desc: 'Play 50 sounds', condition: () => soundsPlayed >= 50 },
    { id: 'voice_transformer', icon: '🎤', title: 'Voice Transformer', desc: 'Record and transform your voice', condition: () => effectsApplied >= 1 },
    { id: 'keyboard_warrior', icon: '⌨️', title: 'Keyboard Warrior', desc: 'Use all keyboard keys', condition: () => soundsPlayed >= 12 },
    { id: 'circus_performer', icon: '🎪', title: 'Circus Performer', desc: 'Activate circus mode', condition: () => false }, // Will be set by circus mode
    { id: 'symphony_conductor', icon: '🎼', title: 'Symphony Conductor', desc: 'Generate 10 random songs', condition: () => false },
    { id: 'noise_maker', icon: '🔈', title: 'Professional Noise Maker', desc: 'Play 100 sounds', condition: () => soundsPlayed >= 100 }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐄 Weird Music Maker is loading...');
    
    // Initialize Tone.js
    initializeTone();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize achievements
    initializeAchievements();
    
    // Start the background animation
    startBackgroundAnimations();
    
    console.log('🎵 Ready to make some weird music!');
});

// Initialize Tone.js audio context
async function initializeTone() {
    try {
        await Tone.start();
        console.log('🎼 Tone.js audio context started');
    } catch (error) {
        console.error('Error starting Tone.js:', error);
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Instrument cards
    document.querySelectorAll('.instrument-card').forEach(card => {
        const playBtn = card.querySelector('.play-btn');
        const soundType = card.dataset.sound;
        
        playBtn.addEventListener('click', () => playAnimalInstrument(soundType));
        card.addEventListener('click', (e) => {
            if (e.target !== playBtn) {
                playAnimalInstrument(soundType);
            }
        });
    });
    
    // Virtual keyboard
    document.querySelectorAll('.key').forEach(key => {
        const note = key.dataset.note;
        const sound = key.dataset.sound;
        
        key.addEventListener('click', () => playKeyboardSound(note, sound));
        key.addEventListener('mousedown', () => key.style.transform = 'scale(0.95)');
        key.addEventListener('mouseup', () => key.style.transform = '');
        key.addEventListener('mouseleave', () => key.style.transform = '');
    });
    
    // Main controls
    document.getElementById('chaosMode').addEventListener('click', toggleChaosMode);
    document.getElementById('stopAll').addEventListener('click', stopAllSounds);
    
    // Recording controls
    document.getElementById('recordBtn').addEventListener('click', toggleRecording);
    document.getElementById('playRecording').addEventListener('click', playRecording);
    document.getElementById('downloadRecording').addEventListener('click', downloadRecording);
    
    // Random generators
    document.getElementById('randomSong').addEventListener('click', generateRandomSong);
    document.getElementById('soundMixer').addEventListener('click', activateSoundMixer);
    document.getElementById('circusMode').addEventListener('click', activateCircusMode);
    
    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
}

// Play animal instrument sounds
function playAnimalInstrument(soundType) {
    const sound = animalSounds[soundType];
    if (!sound) return;
    
    console.log(`🎵 Playing ${soundType} instrument`);
    
    // Create a complex animal sound using multiple oscillators
    const synth1 = new Tone.Oscillator(sound.baseFreq, "sawtooth").toDestination();
    const synth2 = new Tone.Oscillator(sound.baseFreq * 1.5, "triangle").toDestination();
    const synth3 = new Tone.Oscillator(sound.baseFreq * 0.7, "square").toDestination();
    
    // Add effects based on animal type
    let reverb = new Tone.Reverb(2).toDestination();
    let distortion = new Tone.Distortion(0.4).toDestination();
    
    synth1.connect(reverb);
    synth2.connect(distortion);
    
    // Animal-specific patterns
    switch(soundType) {
        case 'cow':
            playMooPattern(synth1, synth2, synth3);
            break;
        case 'sheep':
            playBaaPattern(synth1, synth2, synth3);
            break;
        case 'pig':
            playOinkPattern(synth1, synth2, synth3);
            break;
        case 'chicken':
            playCluckPattern(synth1, synth2, synth3);
            break;
        case 'duck':
            playQuackPattern(synth1, synth2, synth3);
            break;
        default:
            playGenericAnimalPattern(synth1, synth2, synth3, soundType);
    }
    
    // Track for chaos meter and achievements
    incrementSoundsPlayed();
    increaseChaosLevel(5);
}

// Specific animal sound patterns
function playMooPattern(s1, s2, s3) {
    s1.start();
    s1.frequency.exponentialRampToValueAtTime(150, "+0.5");
    s1.stop("+2");
    
    setTimeout(() => {
        s2.start();
        s2.frequency.exponentialRampToValueAtTime(180, "+0.3");
        s2.stop("+1");
    }, 500);
}

function playBaaPattern(s1, s2, s3) {
    // Quick staccato bleats
    for(let i = 0; i < 3; i++) {
        setTimeout(() => {
            s1.start();
            s1.stop(`+0.2`);
        }, i * 300);
    }
}

function playOinkPattern(s1, s2, s3) {
    s1.start();
    s1.frequency.exponentialRampToValueAtTime(250, "+0.1");
    s1.frequency.exponentialRampToValueAtTime(350, "+0.2");
    s1.stop("+0.3");
    
    setTimeout(() => {
        s2.start();
        s2.stop("+0.1");
    }, 400);
}

function playCluckPattern(s1, s2, s3) {
    // Rapid fire clucks
    for(let i = 0; i < 5; i++) {
        setTimeout(() => {
            s1.start();
            s1.stop(`+0.1`);
        }, i * 100);
    }
}

function playQuackPattern(s1, s2, s3) {
    s1.start();
    s1.frequency.exponentialRampToValueAtTime(500, "+0.2");
    s1.frequency.exponentialRampToValueAtTime(600, "+0.4");
    s1.stop("+0.5");
}

function playGenericAnimalPattern(s1, s2, s3, type) {
    s1.start();
    s1.frequency.exponentialRampToValueAtTime(animalSounds[type].baseFreq * 1.2, "+0.3");
    s1.stop("+1");
}

// Keyboard sound generation
function playKeyboardSound(note, soundType) {
    const sound = animalSounds[soundType];
    if (!sound) return;
    
    console.log(`🎹 Playing ${note} with ${soundType} sound`);
    
    // Convert note to frequency
    const freq = Tone.Frequency(note).toFrequency();
    
    // Create weird hybrid sound
    const synth = new Tone.FMSynth({
        harmonicity: 3,
        modulationIndex: 10,
        detune: Math.random() * 100 - 50,
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.5,
            release: 0.5
        },
        modulation: {
            type: "square"
        },
        modulationEnvelope: {
            attack: 0.5,
            decay: 0,
            sustain: 1,
            release: 0.5
        }
    }).toDestination();
    
    synth.triggerAttackRelease(freq, "8n");
    
    // Add visual feedback
    const keyElement = document.querySelector(`[data-note="${note}"]`);
    keyElement.style.transform = 'scale(0.95)';
    setTimeout(() => {
        keyElement.style.transform = '';
    }, 150);
    
    incrementSoundsPlayed();
    increaseChaosLevel(2);
}

// Voice recording functionality
async function toggleRecording() {
    if (!isRecording) {
        await startRecording();
    } else {
        stopRecording();
    }
}

async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            recordedAudio = URL.createObjectURL(audioBlob);
            document.getElementById('playRecording').disabled = false;
            document.getElementById('downloadRecording').disabled = false;
        };
        
        mediaRecorder.start();
        isRecording = true;
        
        const recordBtn = document.getElementById('recordBtn');
        recordBtn.classList.add('recording');
        recordBtn.querySelector('.record-text').textContent = 'Stop Recording';
        
        // Start visualizer
        startRecordingVisualizer(stream);
        
        console.log('🎤 Recording started');
        
    } catch (error) {
        console.error('Error accessing microphone:', error);
        alert('Error accessing microphone. Please allow microphone access.');
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        isRecording = false;
        
        const recordBtn = document.getElementById('recordBtn');
        recordBtn.classList.remove('recording');
        recordBtn.querySelector('.record-text').textContent = 'Start Recording';
        
        // Stop all tracks
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        
        console.log('🎤 Recording stopped');
        increaseChaosLevel(10);
    }
}

function playRecording() {
    if (!recordedAudio) return;
    
    const selectedEffect = document.querySelector('input[name="effect"]:checked').value;
    console.log(`🔊 Playing recording with ${selectedEffect} effect`);
    
    // Instead of playing the real recording, play a weird transformed version
    playWeirdTransformation(selectedEffect);
    
    effectsApplied++;
    checkAchievements();
    increaseChaosLevel(15);
}

function playWeirdTransformation(effect) {
    let frequency = 440;
    let duration = 2;
    
    switch(effect) {
        case 'robot':
            playRobotVoice();
            break;
        case 'chipmunk':
            playChipmunkVoice();
            break;
        case 'demon':
            playDemonVoice();
            break;
        case 'underwater':
            playUnderwaterVoice();
            break;
        case 'alien':
            playAlienVoice();
            break;
        case 'reversed':
            playReversedVoice();
            break;
    }
}

function playRobotVoice() {
    const synth = new Tone.MetalSynth().toDestination();
    const pattern = ['C4', 'D4', 'E4', 'F4'];
    
    pattern.forEach((note, index) => {
        setTimeout(() => {
            synth.triggerAttackRelease(note, "8n");
        }, index * 200);
    });
}

function playChipmunkVoice() {
    const synth = new Tone.Synth().toDestination();
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            synth.triggerAttackRelease(800 + Math.random() * 400, "16n");
        }, i * 50);
    }
}

function playDemonVoice() {
    const synth = new Tone.FMSynth().toDestination();
    synth.triggerAttackRelease(100, "2n");
    setTimeout(() => synth.triggerAttackRelease(80, "2n"), 500);
    setTimeout(() => synth.triggerAttackRelease(120, "2n"), 1000);
}

function playUnderwaterVoice() {
    const reverb = new Tone.Reverb(4).toDestination();
    const synth = new Tone.Synth().connect(reverb);
    
    synth.triggerAttackRelease(200, "1n");
    setTimeout(() => synth.triggerAttackRelease(180, "1n"), 1000);
}

function playAlienVoice() {
    const synth = new Tone.AMSynth().toDestination();
    for(let i = 0; i < 8; i++) {
        setTimeout(() => {
            synth.triggerAttackRelease(300 + Math.random() * 600, "16n");
        }, i * 100);
    }
}

function playReversedVoice() {
    const synth = new Tone.Synth().toDestination();
    const notes = ['G4', 'F4', 'E4', 'D4', 'C4'];
    notes.forEach((note, index) => {
        setTimeout(() => {
            synth.triggerAttackRelease(note, "8n");
        }, index * 300);
    });
}

function downloadRecording() {
    if (!recordedAudio) return;
    
    // Create a fake "weird" audio file name
    const weirdNames = [
        'my_voice_but_as_a_cow.wav',
        'definitely_not_human_sounds.wav',
        'alien_communication.wav',
        'robot_translation.wav',
        'underwater_whale_song.wav',
        'chipmunk_opera.wav'
    ];
    
    const filename = weirdNames[Math.floor(Math.random() * weirdNames.length)];
    
    const a = document.createElement('a');
    a.href = recordedAudio;
    a.download = filename;
    a.click();
    
    console.log(`💾 Downloaded: ${filename}`);
}

// Recording visualizer
function startRecordingVisualizer(stream) {
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    
    source.connect(analyser);
    analyser.fftSize = 256;
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    function draw() {
        if (!isRecording) return;
        
        requestAnimationFrame(draw);
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < bufferLength; i++) {
            barHeight = (dataArray[i] / 255) * canvas.height;
            
            const hue = (i / bufferLength) * 360;
            ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            
            x += barWidth + 1;
        }
    }
    
    draw();
}

// Random song generator
function generateRandomSong() {
    const songStructures = [
        'Verse-Chorus-Verse-Chorus-Bridge-Chorus',
        'Intro-Verse-Chorus-Verse-Chorus-Outro',
        'Chaos-More Chaos-Even More Chaos-Suddenly Quiet-EXPLOSION'
    ];
    
    const animalChoirs = [
        '🐄 Cow Harmony Section',
        '🐑 Sheep Percussion Ensemble',
        '🐷 Pig Brass Band',
        '🐔 Chicken String Quartet',
        '🦆 Duck Jazz Trio',
        '🐱 Cat Opera Singers'
    ];
    
    const weirdInstruments = [
        'Rubber Chicken Guitar',
        'Toilet Paper Roll Drums',
        'Banana Keyboard',
        'Bicycle Horn Bass',
        'Vacuum Cleaner Violin',
        'Kitchen Pot Symphony'
    ];
    
    const structure = songStructures[Math.floor(Math.random() * songStructures.length)];
    const choir = animalChoirs[Math.floor(Math.random() * animalChoirs.length)];
    const instrument = weirdInstruments[Math.floor(Math.random() * weirdInstruments.length)];
    
    const songTitle = `"${generateWeirdSongTitle()}"`;
    
    const songDisplay = document.getElementById('songDisplay');
    songDisplay.innerHTML = `
        <h4>${songTitle}</h4>
        <p><strong>Structure:</strong> ${structure}</p>
        <p><strong>Lead:</strong> ${choir}</p>
        <p><strong>Solo:</strong> ${instrument}</p>
        <p><strong>Key:</strong> Somewhere between C and Complete Chaos</p>
        <p><strong>Tempo:</strong> ${Math.floor(Math.random() * 200) + 60} BPM (Beats Per Moo)</p>
    `;
    
    // Play the "song"
    playSongPreview();
    increaseChaosLevel(20);
}

function generateWeirdSongTitle() {
    const adjectives = ['Mysterious', 'Funky', 'Explosive', 'Melancholic', 'Hyperactive', 'Sleepy'];
    const nouns = ['Cow', 'Dream', 'Taco', 'Banana', 'Robot', 'Shoe'];
    const verbs = ['Dancing', 'Screaming', 'Whispering', 'Flying', 'Melting', 'Giggling'];
    
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    
    return `${adj} ${noun} ${verb}`;
}

function playSongPreview() {
    // Create a 5-second "preview" of the random song
    const animals = Object.keys(animalSounds);
    
    for(let i = 0; i < 8; i++) {
        setTimeout(() => {
            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            playAnimalInstrument(randomAnimal);
        }, i * 600);
    }
}

// Sound mixer
function activateSoundMixer() {
    console.log('🔊 Activating sound mixer');
    
    const mixerDisplay = document.getElementById('mixerDisplay');
    mixerDisplay.innerHTML = '<div class="loading"></div> Mixing random weirdness...';
    
    setTimeout(() => {
        // Play 5 random sounds simultaneously
        const animals = Object.keys(animalSounds);
        const selectedAnimals = [];
        
        for(let i = 0; i < 5; i++) {
            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            selectedAnimals.push(randomAnimal);
            setTimeout(() => {
                playAnimalInstrument(randomAnimal);
            }, i * 200);
        }
        
        mixerDisplay.innerHTML = `
            <h4>🎵 Current Mix:</h4>
            <p>${selectedAnimals.map(animal => animalSounds[animal].pattern.toUpperCase()).join(' + ')}</p>
            <p>Warning: May cause uncontrollable toe-tapping</p>
        `;
        
        increaseChaosLevel(25);
    }, 1000);
}

// Circus mode
function activateCircusMode() {
    console.log('🎪 Welcome to the circus!');
    
    document.body.classList.add('disco-mode');
    
    // Play circus sounds
    const circusSequence = ['elephant', 'lion', 'monkey', 'chicken', 'pig'];
    circusSequence.forEach((animal, index) => {
        setTimeout(() => {
            playAnimalInstrument(animal);
        }, index * 800);
    });
    
    // Add floating emojis
    createFloatingEmojis();
    
    // Remove disco mode after 10 seconds
    setTimeout(() => {
        document.body.classList.remove('disco-mode');
    }, 10000);
    
    // Unlock achievement
    unlockAchievement('circus_performer');
    increaseChaosLevel(50);
}

function createFloatingEmojis() {
    const emojis = ['🎪', '🎭', '🎨', '🎪', '🎊', '🎉', '🎈'];
    
    for(let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = window.innerHeight + 'px';
            emoji.style.fontSize = '2em';
            emoji.style.zIndex = '1000';
            emoji.style.pointerEvents = 'none';
            emoji.style.animation = 'float-up 3s ease-out forwards';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                document.body.removeChild(emoji);
            }, 3000);
        }, i * 200);
    }
}

// Chaos mode
function toggleChaosMode() {
    isChaosMode = !isChaosMode;
    
    if (isChaosMode) {
        console.log('🌪️ CHAOS MODE ACTIVATED!');
        document.body.classList.add('chaos-mode');
        document.getElementById('chaosMode').textContent = '🌈 DISABLE CHAOS 🌈';
        
        // Start random sounds
        chaosInterval = setInterval(() => {
            const animals = Object.keys(animalSounds);
            const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
            playAnimalInstrument(randomAnimal);
        }, 1000);
        
        increaseChaosLevel(100);
        unlockAchievement('chaos_master');
    } else {
        console.log('😴 Chaos mode disabled');
        document.body.classList.remove('chaos-mode');
        document.getElementById('chaosMode').textContent = '🌪️ CHAOS MODE 🌪️';
        
        if (chaosInterval) {
            clearInterval(chaosInterval);
        }
    }
}

function stopAllSounds() {
    console.log('🛑 Stopping all sounds');
    
    // Stop Tone.js
    Tone.Transport.stop();
    Tone.Transport.cancel();
    
    // Stop recording if active
    if (isRecording) {
        stopRecording();
    }
    
    // Reset chaos
    chaosLevel = Math.max(0, chaosLevel - 50);
    updateChaosLevel();
    
    // Remove special effects
    document.body.classList.remove('chaos-mode', 'disco-mode');
    
    if (chaosInterval) {
        clearInterval(chaosInterval);
        isChaosMode = false;
        document.getElementById('chaosMode').textContent = '🌪️ CHAOS MODE 🌪️';
    }
}

// Chaos level management
function increaseChaosLevel(amount) {
    chaosLevel = Math.min(100, chaosLevel + amount);
    updateChaosLevel();
}

function updateChaosLevel() {
    const meterFill = document.getElementById('chaosLevel');
    const chaosText = document.getElementById('chaosText');
    
    meterFill.style.width = chaosLevel + '%';
    
    if (chaosLevel < 20) {
        chaosText.textContent = 'Surprisingly Normal';
    } else if (chaosLevel < 40) {
        chaosText.textContent = 'Getting Weird';
    } else if (chaosLevel < 60) {
        chaosText.textContent = 'Pretty Chaotic';
    } else if (chaosLevel < 80) {
        chaosText.textContent = 'Maximum Weirdness';
    } else {
        chaosText.textContent = 'COMPLETE MADNESS!';
    }
}

// Achievement system
function initializeAchievements() {
    const container = document.getElementById('achievements');
    
    achievementDefs.forEach(achievement => {
        const div = document.createElement('div');
        div.className = 'achievement';
        div.id = `achievement-${achievement.id}`;
        div.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-title">${achievement.title}</div>
            <div class="achievement-desc">${achievement.desc}</div>
        `;
        container.appendChild(div);
    });
}

function checkAchievements() {
    achievementDefs.forEach(achievement => {
        if (!achievements.includes(achievement.id) && achievement.condition()) {
            unlockAchievement(achievement.id);
        }
    });
}

function unlockAchievement(id) {
    if (achievements.includes(id)) return;
    
    achievements.push(id);
    const element = document.getElementById(`achievement-${id}`);
    element.classList.add('unlocked');
    
    // Show notification
    showAchievementNotification(achievementDefs.find(a => a.id === id));
    
    console.log(`🏆 Achievement unlocked: ${id}`);
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ffd93d, #ff6b6b);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.5s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.5em;">${achievement.icon}</span>
            <div>
                <div>Achievement Unlocked!</div>
                <div style="font-size: 0.9em; opacity: 0.9;">${achievement.title}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Helper functions
function incrementSoundsPlayed() {
    soundsPlayed++;
    checkAchievements();
}

function handleKeyPress(event) {
    // Map keyboard keys to animal sounds
    const keyMap = {
        'a': 'cow',
        's': 'sheep',
        'd': 'pig',
        'f': 'chicken',
        'g': 'duck',
        'h': 'cat',
        'j': 'dog',
        'k': 'horse',
        'l': 'goat',
        'z': 'elephant',
        'x': 'lion',
        'c': 'monkey'
    };
    
    const soundType = keyMap[event.key.toLowerCase()];
    if (soundType) {
        event.preventDefault();
        playAnimalInstrument(soundType);
        
        // Visual feedback for keyboard
        const keyElement = document.querySelector(`[data-sound="${soundType}"]`);
        if (keyElement) {
            keyElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                keyElement.style.transform = '';
            }, 150);
        }
    }
    
    // Special keys
    if (event.key === ' ') {
        event.preventDefault();
        toggleChaosMode();
    }
}

function startBackgroundAnimations() {
    // Add random floating elements
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every second
            createFloatingNote();
        }
    }, 1000);
}

function createFloatingNote() {
    const notes = ['🎵', '🎶', '🎼', '🎺', '🎸', '🥁'];
    const note = document.createElement('div');
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        font-size: 1.5em;
        z-index: 1;
        pointer-events: none;
        animation: float-up 4s ease-out forwards;
        opacity: 0.7;
    `;
    
    document.body.appendChild(note);
    
    setTimeout(() => {
        if (document.body.contains(note)) {
            document.body.removeChild(note);
        }
    }, 4000);
}

// Share functionality
function shareWeirdness() {
    const messages = [
        "I just made a cow play piano! 🐄🎹",
        "My voice now sounds like a robot chicken! 🤖🐔",
        "I've achieved maximum musical chaos! 🌪️🎵",
        "Come hear my elephant trumpet symphony! 🐘🎺",
        "This is the weirdest music app ever! 🎭🎶"
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    if (navigator.share) {
        navigator.share({
            title: 'Weird Music Maker',
            text: message,
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(`${message} ${window.location.href}`);
        alert('Weird music link copied to clipboard! 📋');
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        from {
            transform: translateY(0);
            opacity: 0.7;
        }
        to {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🎉 Weird Music Maker loaded successfully! Let the chaos begin! 🎵');