/* --- GLOBAL APPLICATION STATE --- */
        let streamActiveInstance = null;
        let activeFacingMode = "user";

        // Kumpulan bisikan doa & cinta romantis untuk Rayya
        const affirmationBank = [
            "Selamat ulang tahun, bidadariku tercinta. Terima kasih sudah lahir dan mewarnai duniaku.",
            "Semoga di usiamu yang baru ini, setiap langkahmu dipeluk oleh ketenangan dan kebahagiaan tanpa akhir.",
            "Kamu adalah bagian terbaik dari setiap hariku, Rayya. Semoga semesta selalu menjagamu.",
            "Semoga semua mimpi indahmu terwujud, dan semoga aku selalu diizinkan menemanimu mencapainya.",
            "Sehat selalu ya sayang. Senyummu adalah alasan terbaik kenapa aku selalu bersyukur.",
            "Kamu pantas mendapatkan segala cinta dan kebaikan di dunia ini, tanpa terkecuali.",
            "Terima kasih sudah bertahan, tumbuh seindah ini, dan memilih untuk tetap bersamaku.",
            "Setiap detik bersamamu adalah berkah terindah yang nggak akan pernah berhenti kusyukuri.",
            "Selamat bertambah usia, cantiknya aku. Tetaplah jadi Rayya yang hangat dan tulus ya.",
            "Semoga Tuhan melancarkan segala urusanmu dan meridhoi setiap langkah kakimu.",
            "Kamu adalah rumah tempat segala lelahku hilang. Jangan pernah lupa betapa berharganya dirimu buatku.",
            "Semoga hari-harimu selalu diringankan, dan semoga hatimu selalu dipenuhi rasa damai.",
            "Selamat ulang tahun, semestaku. Semoga tawa manismu itu tak pernah pudar.",
            "Kamu adalah jawaban dari doa-doa bahagiaku yang pernah kupanjatkan dalam diam.",
            "Semoga tahun ini membawakanmu kejutan-kejutan termanis yang tak pernah kamu duga sebelumnya.",
            "Terima kasih sudah mencintaiku dengan caramu yang luar biasa tulus, Rayya.",
            "Selamat menikmati hari spesialmu, cintaku. Hari ini adalah harimu yang paling istimewa.",
            "Kamu bukan cuma sekedar ada di hidupku, kamu adalah alasan hidupku terasa begitu bermakna.",
            "Semoga kebaikan yang selalu kamu tabur kembali padamu berlipat-lipat kali ganda.",
            "Di hari lahirmu ini, doaku sederhana: semoga bahagiamu selalu abadi, bersamaku.",
            "Kamu cantik bukan cuma dari parasmu, tapi dari ketulusan hatimu yang selalu menghangatkan duniaku.",
            "Apapun yang terjadi di depan nanti, kamu nggak akan pernah sendirian. Ada aku di sini.",
            "Selamat ulang tahun, Rayya sayang. Semoga kamu selalu dikelilingi cinta yang tulus.",
            "Tatap masa depanmu dengan senyuman ya, bidadariku. Aku akan selalu ada mendukung setiap impianmu.",
            "Semoga umur baru ini membawa kedewasaan yang tenang dan kebahagiaan yang melimpah.",
            "Kamu adalah anugerah terindah yang pernah Tuhan kirimkan ke dalam garis hidupku.",
            "Jadilah dirimu sendiri yang luar biasa, karena Rayya yang seperti inilah yang kucintai sepenuhnya.",
            "Selamat bertambah usia, belahan jiwaku. Mari rayakan banyak tahun-tahun indah lagi bersama.",
            "Semoga setiap tetes air mata yang pernah jatuh berganti menjadi ribuan tawa bahagia di umur barumu.",
            "I love you more than words could ever explain, Rayya Childora W. Happy birthday! 🤍"
        ];

        const mirrorOverlaysBank = [
            "Tatap dirimu... kamu begitu berharga, Rayya.",
            "Orang di depanmu ini adalah cinta terbesarku.",
            "Kamu luar biasa cantik, luar dan dalam.",
            "Senyummu adalah rumah paling nyaman buat hatiku.",
            "Terima kasih sudah hadir di semestaku, bidadariku.",
            "Hari ini dan selamanya, kamu sangat kucintai."
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
            messageOutput.innerText = "Melihat kamu bahagia adalah kebahagiaan terbesarku, Rayya. Semoga senyum manismu terus menemaniku dan menghangatkan hari-hari kita sepanjang tahun ini. Aku sayang kamu! 🤍";
            break;

        case 'Content':
            messageOutput.innerText = "Merasa damai dan cukup di hari ulang tahunmu adalah anugerah yang sangat indah. Semoga rasa syukur dan ketenangan ini selalu mendekap hatimu di setiap helaan napas, sayang.";
            break;

        case 'Calm':
            messageOutput.innerText = "Ketenangan di matamu selalu bisa meneduhkan segala riuh di kepalaku. Nikmati momen hari spesialmu ini dengan sepenuh jiwa ya, bidadariku tercinta.";
            break;

        case 'Neutral':
            messageOutput.innerText = "Nggak apa-apa kalau hari ini terasa biasa saja, sayang. Bersandarlah padaku, biar aku yang usahakan kebahagiaan-kebahagiaan kecil buat harimu terasa istimewa.";
            break;

        case 'Sad':
            messageOutput.innerText = "Sini peluk hangat dulu... Jangan dipendam sendirian ya, manis. Apapun yang sedang membebani hatimu, ingat ada aku yang selalu siap jadi tempatmu pulang dan bercerita. Kamu nggak pernah sendirian, Rayya.";
            break;

        case 'Overwhelmed':
            messageOutput.innerText = "Tarik napas pelan-pelan ya, cintaku... Dunia memang kadang terasa begitu bising dan melelahkan, tapi kamu sudah berjuang luar biasa hebat. Istirahat sejenak, kamu selalu aman bersamaku.";
            break;

        default:
            messageOutput.innerText = "Terima kasih sudah meluangkan waktu di hari spesialmu ini, cintaku. Selalu ada cinta untukmu di sini. 🤍";
    }
}

        /* --- STAGE 6: CORE LOCALSTORAGE DIARY SYSTEM --- */
        function commitJournalEntry() {
            const currentContent = document.getElementById('journal-editor').value;
            localStorage.setItem('birthday_stored_journal', currentContent);
            alert("Harapan dan isi hatimu yang indah sudah tersimpan aman di sini, sayang. 🤍");
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