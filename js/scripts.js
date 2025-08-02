
        let chaos = 0;
        let isRecording = false;
        let recordingTimeout;
        let currentPage = 'mainPage';

        // Weird sounds library
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
            ping: "PING! 📡",
            // Guitar sounds (train/horn themed)
            trainhorn: "CHOO CHOO HOOOOORN! 🚂",
            siren: "WEEEE-OOOOO-WEEEE! 🚨",
            foghorn: "HOOOOOONK! 🌫️",
            airhorn: "HOOOOOOOONK! 📯",
            steamwhistle: "WHEEEEE-STEEEAM! 💨",
            carhorn: "BEEP BEEP HOOOONK! 🚗",
            boathorn: "HOOOOORN AHOY! ⛵",
            truckhorn: "HOOOOOONK TRUUUCK! 🚛",
            bikehorn: "HONK HONK! 🚲",
            // Trumpet sounds (whale/sea themed)
            whale1: "WHOOOOOOO-OOOOOOO! 🐋",
            whale2: "HOOOO-WAAAAAH-OOOOO! 🐋",
            whale3: "CLICK-WHISTLE-OOOOO! 🐋",
            dolphin: "EEE-EEE-EEE-CLICK! 🐬",
            sealsound: "ARK ARK ARK! 🦭",
            walrussound: "OOOOOH-GAAAAH! 🦭",
            narwhal: "MYSTICAL-WHOOOOO! 🦄"
        };

        // Page Navigation Functions
        function showPage(pageId) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.getElementById(pageId).classList.add('active');
            currentPage = pageId;
        }

        function goToMain() {
            showPage('mainPage');
        }

        function goToInstruments() {
            showPage('instrumentsPage');
            addChaos();
        }

        function goToRecording() {
            showPage('recordingPage');
            addChaos();
        }

        // Instrument Functions
        function showInstrument(instrumentType) {
            // Hide all instruments first
            document.getElementById('piano').style.display = 'none';
            document.getElementById('drums').style.display = 'none';
            document.getElementById('guitar').style.display = 'none';
            document.getElementById('trumpet').style.display = 'none';

            if (instrumentType === 'piano') {
                document.getElementById('piano').style.display = 'block';
            } else if (instrumentType === 'drums') {
                document.getElementById('drums').style.display = 'block';
            } else if (instrumentType === 'guitar') {
                document.getElementById('guitar').style.display = 'block';
            } else if (instrumentType === 'trumpet') {
                document.getElementById('trumpet').style.display = 'block';
            }
            addChaos();
        }

        function playWeirdSound(soundType) {
            const sound = weirdSounds[soundType];
            const audio = document.getElementById(`audio-${soundType}`);
            if (audio) {
                audio.currentTime = 0; // rewind to start
                audio.play();
            }

            // Create floating text effect
            const floatingText = document.createElement('div');
            floatingText.textContent = sound;
            floatingText.style.position = 'fixed';
            floatingText.style.left = Math.random() * (window.innerWidth - 200) + 'px';
            floatingText.style.top = Math.random() * (window.innerHeight - 100) + 'px';
            floatingText.style.fontSize = '2rem';
            floatingText.style.zIndex = '1000';
            floatingText.style.pointerEvents = 'none';
            floatingText.style.animation = 'bounce 1s ease-out forwards';
            floatingText.style.textShadow = '2px 2px 4px rgba(0,0,0,0.7)';
            floatingText.style.color = '#fff';

            document.body.appendChild(floatingText);

            setTimeout(() => {
                if (document.body.contains(floatingText)) {
                    document.body.removeChild(floatingText);
                }
            }, 1000);

            addChaos();
        }

        // Recording Functions
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
            recordBtn.innerHTML = '🎤<br>START';

            clearTimeout(recordingTimeout);

            const audio = document.getElementById("alienAudio");
             audio.currentTime = 0;
             audio.play();



            

            // Show "playback" of weird sounds
            const weirdResults = [
                "🤖 BEEP BOOP BEEP (was 'Hello')",
                "🐄 MOOO MOOO MOO (was 'How are you')",
                "🦆 QUACK QUACK QUACK (was 'I love music')",
                "🐸 RIBBIT RIBBIT (was 'This is fun')",
                "👽 BLORG BLORG ZZZAP (was 'Amazing app!')",
                "🤖 WHIRR BUZZ PING (was 'Let me sing')"
            ];
       

            const randomResult = weirdResults[Math.floor(Math.random() * weirdResults.length)];
            status.textContent = `Playback: ${randomResult}`;

            setTimeout(() => {
                status.textContent = 'Ready to transform your voice again!';
            }, 4000);
        }
        function setEffect(effect) {
            document.getElementById('effectType').value = effect;
          }
          

        function handleFileUpload(event) {
            const file = event.target.files[0];
            const uploadStatus = document.getElementById('uploadStatus');
            
            if (file) {
                uploadStatus.style.display = 'block';
                uploadStatus.textContent = `File "${file.name}" uploaded successfully! 🎵→👽 Transformation complete!`;
                addChaos();
                
                // Simulate processing
                setTimeout(() => {
                    const transformedResults = [
                        "👽 File transformed into alien communication signals!",
                        "🤖 Audio successfully robotified and beep-ified!",
                        "🎪 Your sound is now pure circus chaos!"
                    ];
                    const randomTransform = transformedResults[Math.floor(Math.random() * transformedResults.length)];
                    uploadStatus.textContent = randomTransform;
                }, 2000);
            }
        }

        // Chaos Functions
        function addChaos() {
            chaos += 10;
            if (chaos > 100) chaos = 100;

            const chaosLevel = document.getElementById('chaosLevel');
            const chaosText = document.getElementById('chaosText');

            if (chaosLevel) {
                chaosLevel.style.width = chaos + '%';
            }

            if (chaosText) {
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
        }

        function activateMaxChaos() {
            document.body.style.animation = 'gradientShift 0.5s ease infinite';
            setTimeout(() => {
                document.body.style.animation = 'gradientShift 15s ease infinite';
            }, 3000);
        }

        // Easter Egg Functions
        function secretFeature() {
            document.getElementById('modal').style.display = 'flex';
            chaos = 100;
            addChaos();
        }

        function closeModal() {
            document.getElementById('modal').style.display = 'none';
        }

        // Random chaos events
        setInterval(() => {
            if (Math.random() < 0.05) { // 5% chance every 5 seconds
                const randomEvents = [
                    () => {
                        const msg = document.createElement('div');
                        msg.textContent = '🎪 Random chaos event: A wild accordion appears!';
                        msg.style.position = 'fixed';
                        msg.style.top = '20px';
                        msg.style.right = '20px';
                        msg.style.background = 'rgba(0,0,0,0.8)';
                        msg.style.color = 'white';
                        msg.style.padding = '1rem';
                        msg.style.borderRadius = '10px';
                        msg.style.zIndex = '1500';
                        document.body.appendChild(msg);
                        setTimeout(() => {
                            if (document.body.contains(msg)) {
                                document.body.removeChild(msg);
                            }
                        }, 3000);
                    },
                    () => {
                        document.body.style.transform = 'rotate(1deg)';
                        setTimeout(() => document.body.style.transform = 'rotate(0deg)', 1000);
                    }
                ];
                const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
                randomEvent();
            }
        }, 5000);
  