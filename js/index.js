console.log('ceren');

function saveNicknameAndRedirect() {
    var nicknameInput = document.getElementById("nickname");
    var nickname = nicknameInput.value;

    nickname = nickname.trim();  // Remove any leading or trailing whitespace

    // Replace specific characters with English equivalents
    nickname = nickname.replace(/ö/g, 'o');
    nickname = nickname.replace(/ä/g, 'a');
    nickname = nickname.replace(/å/g, 'a');

    // Check if the nickname contains any punctuation marks
    var punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
    if (punctuationRegex.test(nickname)) {
        var warningBox = document.querySelector(".box-warning p");
        warningBox.textContent = "Punctuation marks cannot be used.";
        var boxWarning = document.querySelector(".box-warning");
        boxWarning.style.display = "block";

        // Hide the warning after 5 seconds
        setTimeout(function () {
            boxWarning.style.display = "none";
        }, 5000);

        return;
    }

    // Check if the nickname is at least 3 characters long
    if (nickname.length < 3) {
        var warningBox = document.querySelector(".box-warning p");
        warningBox.textContent = "You must use at least 3 letters.";
        var boxWarning = document.querySelector(".box-warning");
        boxWarning.style.display = "block";

        // Hide the warning after 5 seconds
        setTimeout(function () {
            boxWarning.style.display = "none";
        }, 5000);

        return;
    }

    // Check if the nickname is empty
    if (!nickname) {
        var warningBox = document.querySelector(".box-warning p");
        warningBox.textContent = "Please enter your nickname.";
        var boxWarning = document.querySelector(".box-warning");
        boxWarning.style.display = "block";
        setTimeout(function () {
            boxWarning.style.display = "none";
        }, 5000);

        return;
    }

    // Redirect to the quiz page with the nickname as a URL parameter
    var url = "quiz.html?nickname=" + encodeURIComponent(nickname);
    window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
    var urlParams = new URLSearchParams(window.location.search);
    var nickname = urlParams.get("nickname");

    // Display the nickname if it exists in the URL
    if (nickname) {
        var nicknameDisplay = document.getElementById("nickname-display");
        nicknameDisplay.textContent = "Start Quiz " + nickname + "!";
    }

    // Function to display the quiz information
    function displayQuizInfo() {
        var quizInfo = document.getElementById("quiz-info");
        quizInfo.style.display = "block";
    }
});

function hideQuizInfo() {
    var quizInfo = document.querySelector('.quiz-info');
    quizInfo.style.display = 'none';  // Hide the quiz information
}
