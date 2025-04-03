document.addEventListener('DOMContentLoaded', () => {
    const options = document.querySelectorAll('.option');
    const numberOfOptions = options.length;

    // Initial voice greeting
    const greetingMessage = `Welcome! Happy to see you! You have ${numberOfOptions} options available. Use the Tab key to navigate. Press Enter to select an option.`;
    speak(greetingMessage);

    // Add focus and click event for speech feedback
    options.forEach(option => {
        option.addEventListener('focus', () => {
            const optionText = option.textContent;
            speak(`You are on ${optionText}. Press Enter to select.`);
        });

        option.addEventListener('click', () => {
            const selectedOption = option.textContent;
            speak(`You selected ${selectedOption}.`);
            handleButtonClick(selectedOption);
        });
    });

    // Enable keyboard navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && document.activeElement.classList.contains('option')) {
            document.activeElement.click(); // Simulate click on focused button
        }
    });
});

// Voice assistant function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}
function handleButtonClick(option) {
    speak(`You selected ${option}.`);
    switch (option) {
        case 'LIVE NEWS':
            window.location.href = '/news/';
            break;
        case 'LISTEN SONGS':
            window.location.href = '/songs/';
            break;
        case 'LIVE MATCHES':
            window.location.href = '/matches/';
            break;
        case 'EDUCATION':
            window.location.href = '/education/';
            break;
        case 'HEALTH':
            window.location.href = '/health/';
            break;
        default:
            speak("Option not recognized.");
    }
}

function proceedToNextPage() {
    window.location.href = '/feedback/';
}