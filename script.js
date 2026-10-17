/* --- GLOBAL APPLICATION STATE --- */
        let streamActiveInstance = null;
        let activeFacingMode = "user";

        // Kumpulan ucapan ulang tahun untuk Rayya
        const affirmationBank = [
            "Selamat ulang tahun, Rayya!",
            "Semoga umur baru ini membawa lebih banyak kebahagiaan.",
            "Semoga semua doa baikmu dikabulkan.",
            "Semoga kamu selalu dikelilingi orang-orang yang menyayangimu.",
            "Semoga sehat selalu, Rayya.",
            "Semoga makin sukses di segala hal yang kamu kejar.",
            "Terima kasih sudah jadi Rayya yang sekarang.",
            "Semoga tahun ini penuh kejutan menyenangkan.",
            "Kamu pantas mendapatkan hari yang indah ini.",
            "Semoga panjang umur dan selalu bahagia.",
            "Semoga rezekimu lancar sepanjang tahun ini.",
            "Semoga mimpi-mimpimu satu per satu terwujud.",
            "Selamat bertambah usia, semoga makin bijaksana.",
            "Semoga hari-harimu ke depan lebih ringan dan menyenangkan.",
            "Kamu berharga, jangan pernah lupa itu.",
            "Semoga cinta dan kebaikan selalu menemukanmu.",
            "Happy birthday, may all your wishes come true.",
            "Wishing you endless joy and laughter this year.",
            "You deserve all the good things coming your way.",
            "Here's to another beautiful year of you.",
            "May this year bring you closer to your dreams.",
            "Stay happy, stay healthy, stay you.",
            "Cheers to more adventures and good memories ahead.",
            "You light up every room you walk into.",
            "May kindness always find its way back to you.",
            "Selamat ulang tahun, semoga makin dewasa dan bahagia.",
            "Semoga langkahmu selalu diberkahi.",
            "Semoga selalu punya alasan untuk tersenyum setiap hari.",
            "Terus jadi Rayya yang hangat dan baik seperti sekarang.",
            "Selamat menikmati hari spesialmu, Rayya."
        ];

        const mirrorOverlaysBank = [
            "Take a look.",
            "Orang di depanmu adalah alasan hari ini spesial.",
            "You are enough, Rayya.",
            "Keep shining.",
            "Semoga hari ini penuh kebahagiaan.",
            "Smile, hari ini harimu."
        ];

        /* --- STAGE 1: NARRATIVE SCREEN RUNNER --- */
        document.addEventListener("DOMContentLoaded", () => {
            executeNarrativeSequence();
            restoreSystemStoredData();
            runStatisticsCounter();
        });

        function executeNarrativeSequence() {
            const narrativeStages = ['n1', 'n2', 'n3', 'n4', 'n5'];
            let activeDelayIndex = 0;

            function renderNextSlide() {
                if (activeDelayIndex > 0) {
                    document.getElementById(narrativeStages[activeDelayIndex - 1]).classList.remove('active');
                }
                if (activeDelayIndex < narrativeStages.length) {
                    const currentElement = document.getElementById(narrativeStages[activeDelayIndex]);
                    currentElement.classList.add('active');
                    activeDelayIndex++;
                    
                    // Controlled sequence timeline
                    if(activeDelayIndex < narrativeStages.length) {
                        setTimeout(renderNextSlide, 2200);
                    }
                }
            }
            renderNextSlide();
        }

        function exitOpeningScreen() {
            const targetScreen = document.getElementById('opening-screen');
            targetScreen.style.opacity = '0';
            setTimeout(() => {
                targetScreen.style.display = 'none';
            }, 1000);
        }

        /* --- STAGE 2: SYSTEM THEME ENGINE (DARK/LIGHT) --- */
        function toggleThemeSystem() {
            const htmlNode = document.documentElement;
            const currentTheme = htmlNode.getAttribute('data-theme');
            const targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlNode.setAttribute('data-theme', targetTheme);
            localStorage.setItem('birthday_sys_theme', targetTheme);
            
            // Icon transition handling
            const themeIcon = document.getElementById('theme-icon');
            themeIcon.className = targetTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        /* --- STAGE 3: SMART CAMERA IMPLEMENTATION --- */
        async function initializeCamera() {
            const videoComponent = document.getElementById('webcam');
            const initButton = document.getElementById('capture-trigger');
            
            if (streamActiveInstance) {
                streamActiveInstance.getTracks().forEach(track => track.stop());
            }

            const configurations = {
                video: { facingMode: activeFacingMode },
                audio: false
            };

            try {
                streamActiveInstance = await navigator.mediaDevices.getUserMedia(configurations);
                videoComponent.srcObject = streamActiveInstance;
                initButton.innerHTML = `<i class="fas fa-camera"></i> Capture`;
                launchOverlayTextLoop();
            } catch (exception) {
                console.error("Hardware mirror error: ", exception);
                alert("Gagal mengakses kamera perangkatmu. Sistem otomatis masuk mode mockup/simulasi.");
            }
        }

        function toggleMirrorDirection() {
            activeFacingMode = activeFacingMode === "user" ? "environment" : "user";
            initializeCamera();
        }

        function triggerFullscreenMode() {
            const cameraBoxElement = document.querySelector('.mirror-box');
            if (cameraBoxElement.requestFullscreen) {
                cameraBoxElement.requestFullscreen();
            }
        }

        function launchOverlayTextLoop() {
            const targetOverlay = document.getElementById('overlay-quote');
            let cycleIndex = 0;
            setInterval(() => {
                targetOverlay.style.opacity = '0';
                setTimeout(() => {
                    cycleIndex = (cycleIndex + 1) % mirrorOverlaysBank.length;
                    targetOverlay.innerText = mirrorOverlaysBank[cycleIndex];
                    targetOverlay.style.opacity = '1';
                }, 500);
            }, 8000); // Transitions seamlessly as per prompt specs
        }

        /* --- STAGE 4: AFFIRMATION SELECTOR --- */
        function fetchRandomAffirmation() {
            const outputBoard = document.getElementById('quote-board');
            outputBoard.style.opacity = '0';
            setTimeout(() => {
                const selectorIndex = Math.floor(Math.random() * affirmationBank.length);
                outputBoard.innerText = `"${affirmationBank[selectorIndex]}"`;
                outputBoard.style.opacity = '1';
            }, 300);
        }

        /* --- STAGE 5: ACTIVE MOOD INTERACTION --- */
function processMoodSelection(emojiSymbol, labelString) {
    const messageOutput = document.getElementById('mood-response');
    localStorage.setItem('birthday_stored_mood', labelString);

    switch (labelString) {

        case 'Happy':
            messageOutput.innerText = "Seneng banget lihat kamu bahagia di hari ulang tahunmu! Semoga senyum itu terus menemanimu sepanjang tahun ini.";
            break;

        case 'Content':
            messageOutput.innerText = "Merasa cukup dan tenang di hari spesialmu itu berharga. Semoga rasa syukur ini terus tumbuh sepanjang umur barumu.";
            break;

        case 'Calm':
            messageOutput.innerText = "Ketenangan di hari ulang tahunmu adalah hadiah tersendiri. Nikmati momen ini sepenuhnya, Rayya.";
            break;

        case 'Neutral':
            messageOutput.innerText = "Nggak apa-apa kalau hari ini terasa biasa saja. Yang penting kamu masih di sini, bertambah usia, dan itu sudah patut disyukuri.";
            break;

        case 'Sad':
            messageOutput.innerText = "Kalau hari ini terasa berat meski sedang ulang tahun, itu wajar. Tidak apa-apa. Semoga besok terasa lebih ringan untukmu.";
            break;

        case 'Overwhelmed':
            messageOutput.innerText = "Kalau semuanya terasa terlalu banyak hari ini, berhenti sejenak dulu ya. Kamu tidak harus sempurna, cukup nikmati harimu pelan-pelan.";
            break;

        default:
            messageOutput.innerText = "Terima kasih sudah meluangkan waktu di hari spesialmu ini. ❤️";
    }
}

        /* --- STAGE 6: CORE LOCALSTORAGE DIARY SYSTEM --- */
        function commitJournalEntry() {
            const currentContent = document.getElementById('journal-editor').value;
            localStorage.setItem('birthday_stored_journal', currentContent);
            alert("Harapan ulang tahunmu sudah aman tersimpan di browser ini.");
        }

        function viewJournalEntry() {
            const savedContent = localStorage.getItem('birthday_stored_journal');
            if (savedContent) {
                alert("Journal tersimpan:\n\n" + savedContent);
            } else {
                alert("Belum ada journal yang tersimpan di browser ini.");
            }
        }

        /* --- STAGE 7: INTERACTIVE PROGRESS TRACKER --- */
        function evaluateChallengeProgress() {
            const checklistNodes = document.querySelectorAll('.task-check');
            let verifiedCounter = 0;
            
            checklistNodes.forEach(box => { if(box.checked) verifiedCounter++; });
            
            const operationalRatio = Math.round((verifiedCounter / checklistNodes.length) * 100);
            document.getElementById('challenge-progress').style.width = `${operationalRatio}%`;
            
            const progressLabel = document.getElementById('progress-status');
            if (operationalRatio === 100) {
                progressLabel.innerHTML = `<strong>Progress: 100% — 🎉 Great Job!</strong>`;
            } else {
                progressLabel.innerText = `Progress: ${operationalRatio}%`;
            }
            
            // Persistent task compilation saving
            const analyticalMap = Array.from(checklistNodes).map(node => node.checked);
            localStorage.setItem('birthday_challenge_matrix', JSON.stringify(analyticalMap));
        }

        /* --- STAGE 8: AUDIO INTEGRATION ARCHITECTURE --- */
        let currentAudio = null; // Tempat menyimpan audio yang sedang berjalan

        // Mapping nama tombol ke file audio asli
        // Kamu bisa pakai link internet (untuk tes langsung) atau file lokal di folder music/ kamu
        const audioFiles = {
        'Rain': 'rain.mp3',
        'Ocean': 'ocean.mp3',
        'Forest': 'forest.mp3',
        'Piano': 'piano.mp3'
        };

        function controlAudioTracks(domElement, toneProfile) {
            const isPlaying = domElement.classList.contains('playing');
            
            // 1. Matikan semua status visual 'playing' di tombol lain
            document.querySelectorAll('.track-card').forEach(card => card.classList.remove('playing'));
            
            // 2. Jika ada musik yang sedang berputar, hentikan dan reset ke awal
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            // 3. Jika tombol yang diklik sebelumnya tidak sedang bermain, jalankan musiknya
            if (!isPlaying) {
                domElement.classList.add('playing');
                
                // Ambil file audio berdasarkan tombol yang diklik (Rain/Ocean/dll)
                currentAudio = new Audio(audioFiles[toneProfile]);
                currentAudio.loop = true; // Supaya musiknya berputar terus-menerus (ambient effect)
                
                // Jalankan audio (ditangkap dengan .catch jika diblokir kebijakan browser)
                currentAudio.play().catch(err => {
                    console.log("Pemutaran audio diblokir oleh browser sebelum ada interaksi pengguna:", err);
                });
                
                console.log(`Audio Streaming Engine Initialized For: ${toneProfile}`);
            } else {
                // Jika tombol yang sama diklik lagi, musik otomatis berhenti (efek toggle)
                currentAudio = null;
            }
        }

        /* --- STAGE 9: RUNTIME STATS ACCELERATOR --- */
        function runStatisticsCounter() {
            const displayElement = document.getElementById('counter-fact');
            let initialCount = 0;
            const targetCeiling = 90;
            
            const countingInterval = setInterval(() => {
                if(initialCount >= targetCeiling) {
                    clearInterval(countingInterval);
                } else {
                    initialCount++;
                    displayElement.innerText = `${initialCount}%`;
                }
            }, 25);
        }

        /* --- DATA LIFECYCLE MANAGEMENT --- */
        function restoreSystemStoredData() {
            // Restore Configuration Theme
            const cachedTheme = localStorage.getItem('birthday_sys_theme');
            if(cachedTheme) {
                document.documentElement.setAttribute('data-theme', cachedTheme);
                document.getElementById('theme-icon').className = cachedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Restore Diary text inputs
            const cachedJournal = localStorage.getItem('birthday_stored_journal');
            if(cachedJournal) document.getElementById('journal-editor').value = cachedJournal;

            // Update Time-stamps
            const formatRules = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('live-date').innerText = new Date().toLocaleDateString('id-ID', formatRules);

            // Restore Checklist conditions
            const checkedCache = localStorage.getItem('birthday_challenge_matrix');
            if(checkedCache) {
                const proceduralArray = JSON.parse(checkedCache);
                const boxes = document.querySelectorAll('.task-check');
                proceduralArray.forEach((stateValue, pointerIndex) => {
                    if(boxes[pointerIndex]) boxes[pointerIndex].checked = stateValue;
                });
                evaluateChallengeProgress();
            }
        }

        /* --- STAGE 10: PIN SECURITY & SPECIAL PAGE NAVIGATION --- */
        const SECRET_PIN_CODE = "130806";
        const SPECIAL_PAGE_URL = "special.html";

        function openPinModal() {
            const modal = document.getElementById('pin-modal');
            const input = document.getElementById('pin-input');
            const errorMsg = document.getElementById('pin-error-msg');
            
            if (!modal) return;
            errorMsg.innerText = '';
            errorMsg.style.color = '#ef4444';
            input.value = '';
            input.disabled = false;
            input.classList.remove('shake');
            modal.classList.add('active');
            setTimeout(() => input.focus(), 150);
        }

        function closePinModal() {
            const modal = document.getElementById('pin-modal');
            if (modal) modal.classList.remove('active');
        }

        function handleBackdropClick(event) {
            if (event.target.id === 'pin-modal') {
                closePinModal();
            }
        }

        function handlePinKeyUp(event) {
            if (event.key === 'Enter') {
                validateSecretPin();
            }
        }

        function validateSecretPin() {
            const input = document.getElementById('pin-input');
            const errorMsg = document.getElementById('pin-error-msg');
            const enteredVal = input.value.trim();

            if (!enteredVal) {
                errorMsg.innerText = "Masukkan PIN terlebih dahulu!";
                input.focus();
                return;
            }

            if (enteredVal === SECRET_PIN_CODE) {
                sessionStorage.setItem('secret_unlocked', '130806');
                errorMsg.style.color = '#10b981';
                errorMsg.innerText = "PIN Benar! Membuka halaman khusus... ✨";
                input.disabled = true;
                setTimeout(() => {
                    window.location.href = SPECIAL_PAGE_URL;
                }, 600);
            } else {
                errorMsg.style.color = '#ef4444';
                errorMsg.innerText = "PIN salah. Coba lagi ya!";
                input.classList.add('shake');
                setTimeout(() => input.classList.remove('shake'), 450);
                input.value = '';
                input.focus();
            }
        }