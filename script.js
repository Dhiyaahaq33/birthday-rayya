/* --- GLOBAL APPLICATION STATE --- */
        let streamActiveInstance = null;
        let activeFacingMode = "user";

                // Kumpulan bisikan doa malam & kenangan masa lalu untuk Rayya
        const affirmationBank = [
            "Selamat ulang tahun, Rayya. Malam ini sunyi, tapi semoga hatimu menemukan kedamaian yang selalu kucari untukmu.",
            "Kadang aku masih teringat obrolan larut malam kita dulu... hal-hal sederhana yang kini hanya jadi kenangan manis di ujung ingatan.",
            "Selamat bertambah usia, Houris. Meski waktu telah membawa kita ke jalan berbeda, rasa kangen pada tawamu tak pernah benar-benar hilang.",
            "Semoga kamu tidak pernah merasa sendirian, bahkan saat malam terasa begitu dingin dan sepi.",
            "Ada rindu yang kusimpan rapi di balik keheningan... terima kasih pernah hadir dan membuat duniaku sempat terasa begitu bermakna.",
            "Tatap langit malam ini, Rayya. Di antara bintang-bintang yang dingin, ada doa tulus yang diam-diam kupanjatkan untukmu.",
            "Waktu mungkin telah mengubah banyak hal di antara kita, tapi caramu tersenyum masih tersimpan abadi di sudut ingatanku.",
            "Semoga luka-luka yang tak pernah kamu ceritakan ke siapa pun perlahan sembuh di umur barumu ini.",
            "Di hari kelahiranmu ini, aku hanya ingin kamu tahu: semua jejak yang pernah kita lalui bersama adalah cerita yang tak pernah kusesali.",
            "Selamat ulang tahun, Houris. Sosokmu yang dulu begitu dekat, kini tetap menjadi nama yang selalu kusebut dalam setiap hening.",
            "Biar malam menelan bisingnya dunia... semoga tidurmu nyenyak dan mimpi-mimpimu malam ini membawa pelukan hangat.",
            "Terima kasih sudah bertahan melewati hari-hari yang berat. Kamu jauh lebih kuat dari apa yang sering kamu bayangkan.",
            "Mungkin kita tak lagi berbagi cerita seperti dulu, tapi doaku agar langkahmu selalu dimudahkan tak pernah berkurang sedikit pun.",
            "Kadang ada lagu yang tiba-tiba berputar, lalu membawaku kembali ke masa-masa di mana kita masih sering tertawa bersama.",
            "Selamat bertambah usia, Rayya. Jangan biarkan dinginnya dunia ini meredupkan kebaikan yang ada di dalam hatimu.",
            "Kamu berharga, lebih dari apa yang sempat kuucapkan langsung saat kita masih sering bertatap mata.",
            "Semoga di umur baru ini, semesta mempertemukanmu dengan orang-orang yang tulus menjagamu tanpa pernah membuatmu ragu.",
            "Rasa kangen ini bukan untuk menahanmu kembali, tapi sekadar caraku menghargai setiap detik yang pernah kita lewati.",
            "Di balik gelapnya malam ulang tahunmu, aku berharap kamu menemukan setitik cahaya yang menuntunmu pada kebahagiaan sejati.",
            "Selamat ulang tahun, Rayya. Semoga senyum manismu yang dulu selalu kurindukan itu tetap mekar di wajahmu.",
            "Setiap detik yang telah berlalu mengajarkanku bahwa hal-hal indah tak harus bertahan selamanya untuk bisa dikenang seumur hidup.",
            "Kalau suatu saat malam terasa terlalu berat dan sepi, ingatlah bahwa pernah ada seseorang yang mengagumi keberadaanmu sedalam ini.",
            "Semoga langkahmu ke depan selalu diringi ketenangan, dan semoga hatimu tak lagi memikul beban yang terlalu berat.",
            "Selamat bertambah usia, Houris. Nama itu masih milikmu di dalam ingatanku, tak pernah berganti.",
            "Mungkin ada banyak hal yang tak sempat terucap di antara kita, tapi malam ini kubiarkan doa-doa ini mengalir tanpa suara.",
            "Terima kasih untuk setiap tawa, obrolan singkat, dan tatapan yang pernah membuat hari-hariku terasa lebih hidup.",
            "Semoga umur baru ini membawamu pada takdir-takdir baik yang pantas kamu dapatkan setelah semua perjuanganmu.",
            "Waktu boleh terus memudar, tapi kenangan tentang seseorang sehebat dirimu akan selalu punya tempat tersendiri.",
            "Selamat ulang tahun, Rayya Childora W. Semoga bahagiamu tak lagi bersyarat di tahun ini.",
            "Dari kejauhan dan dalam sunyi yang pekat... selamat bertambah usia, Rayya. Tetaplah bersinar di dalam gelapmu. 🌒"
        ];

                const mirrorOverlaysBank = [
            "Tatap dirimu... sosok yang tawanya pernah begitu kurindukan.",
            "Di balik dinginnya malam, kamu masih seseorang yang istimewa, Houris.",
            "Jangan biarkan dunia mengubah ketulusan yang pernah kukenal darimu.",
            "Bahkan dari kejauhan, senyummu masih terasa menenangkan.",
            "Malam ini milikmu, Rayya... berbahagialah.",
            "Kenangan tentang apa yang kita lewati masih tersimpan rapi di sini."
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
            fireConfetti('celebration');
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
                fireConfetti('stars');
            }, 300);
        }

        /* --- STAGE 5: ACTIVE MOOD INTERACTION --- */
function processMoodSelection(emojiSymbol, labelString) {
    const messageOutput = document.getElementById('mood-response');
    localStorage.setItem('birthday_stored_mood', labelString);

    switch (labelString) {
        case 'Happy':
            messageOutput.innerText = "Melihatmu tersenyum di hari ini adalah kelegaan tersendiri bagiku. Semoga tawamu malam ini bertahan lama, seperti tawa yang dulu pernah kuhapal, Houris. 🌒";
            break;

        case 'Content':
            messageOutput.innerText = "Kedamaian di tengah sunyinya malam adalah hadiah terbaik. Semoga rasa tenang ini terus menjagamu di setiap langkah sunyi ke depan, Rayya.";
            break;

        case 'Calm':
            messageOutput.innerText = "Di antara dinginnya waktu, ketenanganmu selalu kurindukan. Nikmati malam spesialmu perlahan dalam hening ya, Rayya.";
            break;

        case 'Neutral':
            messageOutput.innerText = "Tak apa jika malam ini terasa hampa atau biasa saja. Kamu sudah melewati banyak hal hingga sampai di titik ini, dan kamu tetap sosok yang berarti bagiku.";
            break;

        case 'Sad':
            messageOutput.innerText = "Jika malam ini terasa berat dan ada rindu yang menyesak, pejamkan matamu sejenak. Meski aku tak lagi di sampingmu, doaku masih setia menjagamu dari jauh.";
            break;

        case 'Overwhelmed':
            messageOutput.innerText = "Tarik napas perlahan di tengah gelap... Kamu sudah berjuang teramat jauh melewati badai. Istirahatlah, malam ini biarkan semesta yang merawat lelahmu.";
            break;

        default:
            messageOutput.innerText = "Terima kasih masih singgah sejenak di ruang sunyi ini. Semoga malam ini membawakanmu ketenangan, Rayya. 🌒";
    }
}

        /* --- STAGE 6: CORE LOCALSTORAGE DIARY SYSTEM --- */
        function commitJournalEntry() {
            const currentContent = document.getElementById('journal-editor').value;
            localStorage.setItem('birthday_stored_journal', currentContent);
            fireConfetti("hearts");
            alert("Harapan dan sepenggal ceritamu telah tersimpan di dalam ruang sunyi ini... — Anonymous 🌒");
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
                fireConfetti('grand');
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

/* ==========================================
   STAGE 11: CONFETTI & CELEBRATION ENGINE
========================================== */

function fireConfetti(preset) {
    if (typeof confetti !== 'function') return;

    try {
        if (preset === 'celebration' || preset === 'grand') {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 10001
            };

            function fire(particleRatio, opts) {
                confetti(Object.assign({}, defaults, opts, {
                    particleCount: Math.floor(count * particleRatio)
                }));
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
                colors: ['#f472b6', '#cbd5e1', '#94a3b8', '#e2e8f0', '#fb7185']
            });
            fire(0.2, {
                spread: 60,
                colors: ['#f472b6', '#e2e8f0', '#64748b', '#38bdf8']
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
                colors: ['#ff8fab', '#ffd6e7', '#fbcfe8']
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2,
                colors: ['#ffbe0b', '#fb5607']
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
                colors: ['#ff8fab', '#cdb4db']
            });
        } else if (preset === 'stars') {
            confetti({
                particleCount: 35,
                spread: 50,
                origin: { y: 0.65 },
                colors: ['#ff8fab', '#ffd6e7', '#cdb4db', '#ffbe0b', '#ffffff'],
                shapes: ['circle'],
                scalar: 0.9,
                zIndex: 10001
            });
        } else if (preset === 'hearts') {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff8fab', '#f43f5e', '#ffd6e7', '#cdb4db'],
                scalar: 1,
                zIndex: 10001
            });
        }
    } catch (err) {
        console.log("Confetti trigger note:", err);
    }
}

/* --- STAGE 12: INTERACTIVE CANDLE & CAKE --- */
let candleBlownState = false;

function blowCandleWish(containerElement) {
    if (candleBlownState) {
        // Can be relit on second click
        const flame = document.getElementById('candle-flame');
        const smoke = document.getElementById('candle-smoke');
        const banner = document.getElementById('cake-wish-banner');
        const instruction = document.getElementById('cake-instruction-text');

        candleBlownState = false;
        flame.classList.remove('blown');
        smoke.classList.remove('active');
        banner.style.display = 'none';
        instruction.innerHTML = '🕯️ <strong>Nyalakan Lilin di Tengah Gelap:</strong> Klik lilin di atas untuk meniup nyala apinya ke dalam hening malam... 🌒';
        return;
    }

    candleBlownState = true;
    const flame = document.getElementById('candle-flame');
    const smoke = document.getElementById('candle-smoke');
    const banner = document.getElementById('cake-wish-banner');
    const instruction = document.getElementById('cake-instruction-text');

    if (flame) flame.classList.add('blown');
    if (smoke) {
        smoke.classList.add('active');
        setTimeout(() => smoke.classList.remove('active'), 2000);
    }

    fireConfetti('celebration');

    if (banner) {
        banner.style.display = 'block';
    }
    if (instruction) {
        instruction.innerHTML = '🌒 <strong>Api Telah Padam:</strong> Doamu telah terbawa angin malam... Kenangan tak pernah benar-benar padam. Klik lagi jika ingin menyalakannya kembali 🕯️';
    }
}

/* --- STAGE 13: SPARKLE CURSOR TRAIL --- */
function initSparkleCursor() {
    let lastSparkleTime = 0;
    const sparkleEmojis = ['✨', '🌸', '⭐', '💫', '💖'];

    function createSparkle(x, y) {
        const now = Date.now();
        if (now - lastSparkleTime < 50) return; // Throttle performance
        lastSparkleTime = now;

        const particle = document.createElement('span');
        particle.className = 'sparkle-particle';
        particle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        
        const randomX = (Math.random() - 0.5) * 40;
        const randomY = -20 - Math.random() * 30;
        const randomRot = (Math.random() - 0.5) * 60;

        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${randomX}px`);
        particle.style.setProperty('--ty', `${randomY}px`);
        particle.style.setProperty('--tr', `${randomRot}deg`);

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 850);
    }

    window.addEventListener('mousemove', (e) => {
        createSparkle(e.clientX, e.clientY);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            createSparkle(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });
}

// Initialize sparkle cursor once DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initSparkleCursor();
});
