document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const feedbackMsg = document.getElementById('form-feedback');
    const submitBtn = document.querySelector('.btn-login');
    const dynamicMsgElement = document.getElementById('dynamic-login-message');
    const originalBtnText = submitBtn.innerHTML;

    // --- 1. RANDOM MESSAGE & TYPEWRITER ANIMATION (Dynamism/Randomness) ---
    const welcomeMessages = [
        "> AUTH_PROTOCOL_INIT",
        "> SYNCHRONIZING_ACCESS_KEYS",
        "> INITIATE_AGENT_HANDSHAKE",
        "> SCANNING_FOR_HOST_ID",
        "> WELCOME_BACK_AGENT",
        "> DECRYPTING_LOGIN_SEQUENCE"
    ];

    function selectAndAnimateMessage() {
        const randomMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
        
        // Remove the default infinite glitch animation before starting the typewriter
        dynamicMsgElement.style.animation = 'none';

        // Use GSAP for a typewriter/glitch effect on load
        let textIndex = 0;
        let glitchCount = 0;
        const targetText = randomMessage;
        dynamicMsgElement.textContent = ''; // Clear existing content

        const typewriter = () => {
            if (textIndex < targetText.length) {
                dynamicMsgElement.textContent += targetText.charAt(textIndex);
                textIndex++;
                setTimeout(typewriter, 75 + Math.random() * 50); // Randomize typing speed
            } else {
                // Apply a temporary glitch after the message is fully typed
                const glitchInterval = setInterval(() => {
                    dynamicMsgElement.classList.add('glitch-active'); // Use a CSS class for short glitch
                    
                    // Simulate random character scramble briefly
                    const scrambledText = targetText.split('').map(char => {
                        return Math.random() < 0.2 ? String.fromCharCode(33 + Math.floor(Math.random() * 94)) : char;
                    }).join('');

                    dynamicMsgElement.textContent = scrambledText;
                    
                    setTimeout(() => {
                        dynamicMsgElement.classList.remove('glitch-active');
                        dynamicMsgElement.textContent = targetText;
                    }, 50);

                    glitchCount++;
                    if (glitchCount >= 5) { // Stop after 5 short glitches
                        clearInterval(glitchInterval);
                    }
                }, 500 + Math.random() * 500); // Randomize glitch frequency
            }
        };

        typewriter();
    }

    // --- 2. MATRIX RAIN EFFECT (Dynamism/Unique Feature) ---
    function initMatrixRain() {
        const canvas = document.getElementById('cyber-rain-canvas');
        if (!canvas) return; // Exit if canvas not found
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤラワガザダバパピビヂゾブヅエェケセテネヘメレヱゲゼデベペオォコソトノホモヨロヲゴゾドボポぷらーいむすたーわんきらーんあどみんいんぷっ';
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = [];

        // Initialize drops array
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            // Semi-transparent background for trails (randomized opacity on load)
            ctx.fillStyle = `rgba(0, 0, 0, ${0.05 + Math.random() * 0.05})`; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = fontSize + 'px "JetBrains Mono"';
            
            for (let i = 0; i < drops.length; i++) {
                const text = katakana[Math.floor(Math.random() * katakana.length)];
                
                // Randomly change color slightly for a flickering effect
                const colorCode = Math.random() < 0.1 ? '#00ff88' : '#00aaff'; 
                ctx.fillStyle = colorCode;
                
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                ctx.fillText(text, x, y);

                // Sending the drop back to the top when it reaches the bottom
                // or randomly for a more dynamic effect (Randomness/Dynamism)
                if (y * fontSize > canvas.height && Math.random() > 0.975) { 
                    drops[i] = 0;
                }
                
                // Incrementing Y coordinate
                drops[i]++;
            }
        }

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-initialize drops with new column count
            drops.length = Math.floor(canvas.width / fontSize);
            for (let i = 0; i < drops.length; i++) {
                if(drops[i] === undefined) drops[i] = 0;
            }
        });

        // Use a slight random speed for the animation loop (Randomness)
        let animationSpeed = 33 + Math.random() * 10;
        setInterval(draw, animationSpeed);
    }
    
    // --- 3. FORM LOGIC WITH ENHANCED FEEDBACK ---

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    function validateField(input, errorId, message) {
        if (input.value.trim() === '') {
            showError(errorId, message);
            return false;
        }
        hideError(errorId);
        return true;
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const isUsernameValid = validateField(usernameInput, 'username-error', 'Codename is required');
        const isPasswordValid = validateField(passwordInput, 'password-error', 'Passkey is required');

        if (!isUsernameValid || !isPasswordValid) {
            feedbackMsg.textContent = '❌ Input validation failed. Check required fields.';
            feedbackMsg.className = 'feedback-message error show';
            return;
        }

        // --- Simulated Login Process ---
        submitBtn.disabled = true;
        
        // Enhanced login sequence with random delay and text effects (Dynamism/Randomness)
        const loginSequence = [
            'INITIATING_SECURE_CHANNEL...',
            'VERIFYING_CREDENTIALS...',
            'PROCESSING_HASH_COLLISION_CHECK...',
            'ATTEMPTING_ROOT_ACCESS...',
            'AWAITING_SERVER_RESPONSE...'
        ];
        
        let sequenceStep = 0;
        const sequenceInterval = setInterval(() => {
            if (sequenceStep < loginSequence.length) {
                submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loginSequence[sequenceStep]}`;
                sequenceStep++;
            } else {
                clearInterval(sequenceInterval);
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> FINALIZING_LOGIN...'; // Last step before result
            }
        }, 500 + Math.random() * 500); // Random delay between steps
        
        feedbackMsg.classList.remove('show');

        // Simulate network delay (with added randomness)
        const simDelay = 2000 + Math.random() * 1000; 
        setTimeout(() => {
            clearInterval(sequenceInterval); // Ensure interval is cleared even if timeout finishes first
            
            const username = usernameInput.value.toLowerCase().trim();
            const password = passwordInput.value.trim();

            // Simple mock authentication logic: Use 'neo_one' / 'matrix' for success
            if (username === 'neo_one' && password === 'matrix') {
                submitBtn.innerHTML = '✅ ACCESS GRANTED';
                feedbackMsg.innerHTML = '✅ ACCESS GRANTED. Redirecting to Command Center...';
                feedbackMsg.className = 'feedback-message success show';
                
                // Simulate fast redirect after success
                setTimeout(() => {
                    // Redirect to the existing leaderboard page (Correct path based on page location)
                    window.location.href = '../pages/leaderboard.html'; 
                }, 1000);

            } else {
                
                // Randomly assign a specific error message (Randomness)
                const errorMessages = [
                    '❌ AUTH_FAIL: Invalid Codename or Passkey. Check input integrity.',
                    '❌ FAILED_HANDSHAKE: Credentials rejected by security kernel. Try again.',
                    '❌ HASH_MISMATCH: Authentication data corrupted. Reset form.',
                    '❌ ACCESS_DENIED: Unknown Host ID detected. Unauthorized.',
                    '❌ UNEXPECTED_TIMEOUT: Connection dropped during verification. Retrying uplink...'
                ];
                
                feedbackMsg.innerHTML = errorMessages[Math.floor(Math.random() * errorMessages.length)];
                feedbackMsg.className = 'feedback-message error show';
                usernameInput.value = '';
                passwordInput.value = '';
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Hide feedback after timeout
                setTimeout(() => {
                    feedbackMsg.classList.remove('show');
                }, 5000);
            }
        }, simDelay); 
    });
    
    // Initialize functions on page load
    selectAndAnimateMessage();
    initMatrixRain();
});