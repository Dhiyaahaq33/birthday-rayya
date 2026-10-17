/* --- GLOBAL APPLICATION STATE --- */
        let streamActiveInstance = null;
        let activeFacingMode = "user";

        // Kumpulan doa baik & apresiasi tulus untuk Rayya
        const affirmationBank = [
            "Selamat ulang tahun, Rayya. Semoga umur baru ini membawakan banyak sekali alasan buat kamu tersenyum.",
            "Semoga di usiamu yang baru ini, setiap langkahmu dipenuhi ketenangan dan kemudahan.",
            "Terima kasih ya sudah hadir dan jadi sosok yang selalu bikin hari-hari terasa lebih berwarna.",
            "Semoga semua mimpi dan cita-cita yang kamu simpan bisa terwujud satu per satu.",
            "Sehat selalu ya, Rayya. Senyum manismu itu selalu punya energi positif buat orang di sekitarmu.",
            "Kamu pantas mendapatkan banyak hal baik dan bahagia di dunia ini.",
            "Terima kasih sudah bertahan dan tumbuh jadi sosok yang sekeren dan sehebat sekarang.",
            "Semoga hari-harimu ke depan selalu terasa lebih ringan dan menyenangkan.",
            "Selamat bertambah usia, Rayya. Tetap jadi pribadi yang hangat dan apa adanya ya.",
            "Semoga Tuhan melancarkan segala urusan dan memudahkan setiap rencana baikmu.",
            "Kamu itu istimewa dengan caramu sendiri, jangan pernah ragu sama kemampuanmu ya.",
            "Semoga hatimu selalu dipenuhi rasa damai dan dikelilingi orang-orang yang tulus.",
            "Selamat ulang tahun! Semoga tawa manismu itu nggak pernah pudar ya, Rayya.",
            "Senang dan bersyukur banget bisa kenal dan dekat sama kamu sejauh ini.",
            "Semoga tahun ini membawakanmu kejutan-kejutan menyenangkan yang bikin kamu bahagia.",
            "Terima kasih sudah selalu jadi teman ngobrol dan sosok yang menyenangkan buatku.",
            "Selamat menikmati hari spesialmu, Rayya. Hari ini harimu, rayakan dengan bahagia!",
            "Keberadaanmu selalu punya arti tersendiri. Terima kasih sudah ada di sekitarku.",
            "Semoga kebaikan yang selalu kamu berikan ke orang lain kembali padamu berlipat ganda.",
            "Di hari lahirmu ini, doaku semoga bahagiamu selalu bertambah di setiap harinya.",
            "Kebaikan dan ketulusan hatimu itu hal yang paling bikin kagum dari dirimu.",
            "Kalau lagi capek atau butuh teman cerita, ingat ya kalau aku selalu ada buat dengerin kamu.",
            "Selamat ulang tahun, Rayya. Semoga kamu selalu dikelilingi kehangatan.",
            "Semoga rasa percaya dirimu makin tumbuh dan masa depanmu makin bersinar terang.",
            "Semoga umur baru ini membawa banyak pengalaman seru dan cerita baru yang berkesan.",
            "Kamu adalah salah satu orang terbaik yang pernah kutemui, Rayya.",
            "Tetap jadi dirimu sendiri ya, karena Rayya yang seperti inilah yang selalu bikin nyaman.",
            "Selamat bertambah usia! Semoga kita bisa terus berbagi banyak cerita seru ke depan.",
            "Semoga hal-hal yang dulu bikin kamu sedih berganti jadi tawa bahagia di umur barumu.",
            "Wishing you the happiest birthday, Rayya Childora W.! Sukses dan bahagia selalu ya. ✨"
        ];

        const mirrorOverlaysBank = [
            "Tatap dirimu... kamu selalu istimewa, Rayya.",
            "Senyummu itu selalu bikin hari jadi lebih baik.",
            "You are truly amazing, jangan pernah lupa itu.",
            "Terima kasih sudah jadi sosok yang menyenangkan.",
            "Hari ini harimu, jangan lupa tersenyum manis ya.",
            "Bangga banget bisa kenal orang sekeren kamu."
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

            // Putar salah satu musik yang tersedia secara acak
            playRandomAudioTrack();
        }

        function playRandomAudioTrack() {
            const trackNames = ['Rain', 'Ocean', 'Forest', 'Piano'];
            const chosenTrack = trackNames[Math.floor(Math.random() * trackNames.length)];

            // Cari elemen tombol kartu musik yang bersesuaian di halaman
            const cards = document.querySelectorAll('.track-card');
            let matchedCard = null;
            cards.forEach(card => {
                if (card.textContent.toLowerCase().includes(chosenTrack.toLowerCase())) {
                    matchedCard = card;
                }
            });

            if (matchedCard) {
                controlAudioTracks(matchedCard, chosenTrack);
            } else {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                }
                currentAudio = new Audio(audioFiles[chosenTrack]);
                currentAudio.loop = true;
                currentAudio.play().catch(err => {
                    console.log("Audio play info:", err);
                });
            }
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
            messageOutput.innerText = "Senang banget lihat kamu bahagia di hari ulang tahunmu! Semoga senyum manis itu terus ada dan menemanimu sepanjang tahun ini ya, Houris. ✨";
            break;

        case 'Content':
            messageOutput.innerText = "Merasa damai dan cukup di hari ulang tahunmu itu berharga banget. Semoga rasa tenang ini terus nemenin setiap langkahmu ke depan, Rayya.";
            break;

        case 'Calm':
            messageOutput.innerText = "Ketenangan di hari ulang tahunmu adalah kado tersendiri. Nikmati momen hari spesialmu ini pelan-pelan ya, Rayya.";
            break;

        case 'Neutral':
            messageOutput.innerText = "Nggak apa-apa kalau hari ini terasa biasa aja. Yang penting kamu sehat, bertambah usia, dan tetap jadi sosok Houris yang selalu mempesona dengan caramu sendiri.";
            break;

        case 'Sad':
            messageOutput.innerText = "Kalau hari ini terasa agak berat, nggak apa-apa ya. Istirahat dulu. Kalau butuh teman ngobrol atau cerita, aku selalu siap dengerin kok.";
            break;

        case 'Overwhelmed':
            messageOutput.innerText = "Tarik napas pelan-pelan ya... Kamu sudah berjuang hebat banget sampai di titik ini. Jangan terlalu keras sama dirimu sendiri, nikmati harimu ya.";
            break;

        default:
            messageOutput.innerText = "Terima kasih sudah meluangkan waktu di hari spesialmu ini ya, Rayya. Semoga harimu menyenangkan! ✨";
    }
}

        /* --- STAGE 6: CORE LOCALSTORAGE DIARY SYSTEM --- */
        function commitJournalEntry() {
            const currentContent = document.getElementById('journal-editor').value;
            localStorage.setItem('birthday_stored_journal', currentContent);
            alert("Harapan dan ceritamu sudah tersimpan rapi di sini ya, Houris. ✨");
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
            const targetCeiling = 100;
            
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