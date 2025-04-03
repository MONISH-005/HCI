function speakMessage(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

document.getElementById("visual-btn").addEventListener("click", function() {
    speakMessage("You have selected Visual Impairment");
    localStorage.setItem("preference", "visual");
    setTimeout(() => {
        window.location.href = "/main_page/";
    }, 1500);
});

document.getElementById("ear-btn").addEventListener("click", function() {
    speakMessage("You have selected Hearing Impairment");
    localStorage.setItem("preference", "hearing");
    setTimeout(() => {
        window.location.href = "/main_page/";
    }, 1500);
});

// Keyboard Navigation - Tab + Enter
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && document.activeElement.classList.contains("preference-btn")) {
        document.activeElement.click();
    }
});

// Announce on Tab Focus
document.getElementById("visual-btn").addEventListener("focus", function() {
    speakMessage("Press Enter if you are visually impaired");
});

document.getElementById("ear-btn").addEventListener("focus", function() {
    speakMessage("Press Enter if you have hearing impairment");
});
