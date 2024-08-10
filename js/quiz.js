$(document).ready(function () {
    var currentQuestion = 0;  // Tracks the current question index
    var score = 0;  // Tracks the user's score
    var countdown = 15;  // Countdown timer starts at 15 seconds
    var countdownInterval;

    // Get the nickname from the URL parameters, default to "User" if not found
    const urlParams = new URLSearchParams(window.location.search);
    const nickname = urlParams.get("nickname") || "User";

    // Clear the localStorage when the page is reloaded
    localStorage.clear();

    // Function to start the countdown timer for each question
    function startCountdown() {
        countdown = 15;  // Set the countdown to 15 seconds each time
        $("#countdown").text(countdown);  // Display the initial countdown value immediately
        countdownInterval = setInterval(function () {
            countdown--;  // Decrease the countdown by one every second
            $("#countdown").text(countdown);  // Update the displayed countdown value
    
            if (countdown === 0) {
                clearInterval(countdownInterval);
                checkAnswer(-1);  // Automatically consider the answer wrong when time runs out
            }
        }, 1000);
    }
    

    // Function to load the current question's flag image
    function loadImages() {
        var current = questions[currentQuestion];  // Get the current question object
        $("#flag-image").attr("src", current.image);  // Update the flag image source
    }

    // Function to display the current question and possible answers
    function displayQuestion() {
        // Clear the results list before displaying a new question
        $(".result-list").empty();

        clearInterval(countdownInterval);  // Stop the previous countdown

        if (currentQuestion < questions.length) {
            var current = questions[currentQuestion];  // Get the current question object
            $("#question").text(current.question);  // Display the current question
            $("#countdown").text(countdown);  // Reset the countdown display
            var answersList = $("#answers").empty();  // Clear previous answers

            // Display each possible answer as a button
            current.answers.forEach(function (answer, index) {
                var listItem = $("<li></li>");
                var answerButton = $("<button class='answer'></button>").text(answer);
                answerButton.on("click", function () {
                    checkAnswer(index);  // Check the selected answer when clicked
                });

                listItem.append(answerButton);
                answersList.append(listItem);
            });
            loadImages();  // Load the flag image for the current question
            startCountdown();  // Start the countdown timer
        } else {
            goToResults();  // Show results when all questions are answered
            
            // Dynamically create Restart button at the end of the quiz
            $(".go-leader").html(`
                <button class="button" id="restart-button">Restart</button>
            `);
    
            $("#restart-button").click(function () {
                quizRestart();  // Restart the quiz when the button is clicked
            });
    
            // Show the Restart button
            $(".go-leader").show();
        }
    }

    // Function to check the user's answer and update the score
    function checkAnswer(userAnswerIndex) {
        clearInterval(countdownInterval);  // Stop the countdown timer
        if (userAnswerIndex === questions[currentQuestion].correctAnswer) {
            score++;  // Increase the score if the answer is correct
        }
        currentQuestion++;  // Move to the next question
        if (currentQuestion < questions.length) {
            displayQuestion();  // Display the next question
        } else {
            goToResults(); 
            console.log("goToResults() function called."); // Show results if all questions are answered
        }
    }

    // Function to restart the quiz without refreshing the page
    function quizRestart() {
        currentQuestion = 0;  // Reset to the first question
    
        // Reset UI elements for the first question
        $("#flag-image").show(); 
        $("#question").text(''); // Clear the question text
        $("#answers").empty(); // Clear the answer options
        $(".results").hide(); // Hide the results section
        $(".question-card").show(); // Show the question card

        // Hide the Restart button
        $("#restart-button").hide();
    
        // Load the first question again
        displayQuestion();
    }

    // Function to display the quiz results
    function goToResults() {
        $(".question-card").hide();  // Hide the question card
        $(".results").show();  // Show the results section
        $(".go-leader").show();  // Show the Restart button
    
        // Rebind the click event to the Restart button
        $("#restart-button").off('click').on('click', function () {
            quizRestart();  // Restart the quiz when the button is clicked
        });
    
        // Save the current result to localStorage
        let userData = JSON.parse(localStorage.getItem("userData")) || [];
        userData.push({ nickname: nickname, score: score });
        localStorage.setItem("userData", JSON.stringify(userData));
    
        userData.sort(function (a, b) {
            return b.score - a.score;
        });
    
        var resultHTML = '';
        userData.forEach(function (user, index) {
            resultHTML += '<li>' + user.nickname + ' - ' + user.score + ' points</li>';
        });
    
        $(".result-list").html(resultHTML);
    }
    

    displayQuestion();  // Display the first question when the page loads

    
});
