function rate(stars) {
    const starElements = document.querySelectorAll('.stars i');
    starElements.forEach((star, index) => {
        if (index < stars) {
            star.classList.remove('far');
            star.classList.add('fas');
            star.style.color = "gold";
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
            star.style.color = "";
        }
    });
    localStorage.setItem('userRating', stars);
}

function startDictation() {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = function() {
            document.querySelector('.voice-icon').style.backgroundColor = "red";
        };

        recognition.onresult = function(event) {
            document.querySelector('.comments').value = event.results[0][0].transcript;
            localStorage.setItem('userComment', event.results[0][0].transcript);
            recognition.stop();
        };

        recognition.onerror = function(event) {
            alert("Voice recognition error. Try again.");
            recognition.stop();
        };

        recognition.onend = function() {
            document.querySelector('.voice-icon').style.backgroundColor = "black";
        };

        recognition.start();
    } else {
        alert("Your browser does not support speech recognition.");
    }
}

function validateFeedback() {
    const comments = document.querySelector('.comments').value.trim();
    if (comments === "") {
        alert("Please enter your comments before submitting.");
        return false;
    }
    return true;
}

function submitFeedback() {
    if (!validateFeedback()) return; // Ensure validation before proceeding

    const thankYouMessage = document.getElementById('thankYouMessage');
    thankYouMessage.style.display = 'block';

    const msg = new SpeechSynthesisUtterance('Thank you for your feedback!');
    window.speechSynthesis.speak(msg);

    setTimeout(() => {
        window.location.href = "/home/"; // Redirect after showing thank-you message
    }, 3000);

    localStorage.removeItem('userComment');
    localStorage.removeItem('userRating');
}

// Ensure saved data is loaded when the page loads
window.onload = function() {
    const savedComment = localStorage.getItem('userComment');
    const savedRating = localStorage.getItem('userRating');

    if (savedComment) {
        document.querySelector('.comments').value = savedComment;
    }

    if (savedRating) {
        rate(parseInt(savedRating));
    }

    // Attach event listener to the submit button
    document.querySelector('.submit-btn').addEventListener('click', submitFeedback);
};
