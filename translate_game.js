$(document).ready(function() {
    var lang_from = "Spanish";
    var lang_to = "English";
    var current_dict = dicts.English.Spanish;
    var previousEntries = [];
    var previousEntriesSpanish =[];
    previousEntriesAnswer = [];

    var word;
    var translation;

    // Function to display a random Spanish word
    function displayRandomWord() {
        var spanishWords = Object.keys(current_dict);
        var randomWordIndex = Math.floor(Math.random() * spanishWords.length);
        var randomWord = spanishWords[randomWordIndex];
        translation = current_dict[randomWord];

        word = randomWord;

        $("#word_to_translate").text(translation); // Display the Spanish word
        $("#english").val("").focus();

        console.log(translation);
        console.log(randomWord);
    }

    // Function to check if the translation is correct
    function isTranslationCorrect(englishTranslation) {
        return englishTranslation.trim().toLowerCase() === word.trim().toLowerCase();
    }

    // Function to provide feedback and update the previous entries list
    function provideFeedback() {
        var spanishWord = $("#word_to_translate").text();
        var englishTranslation = $("#english").val();

        var isCorrect = isTranslationCorrect(englishTranslation);

        var feedbackElementSpanish = $("<td>").text(spanishWord);
        feedbackElementSpanish.addClass(isCorrect ? "correct" : "incorrect");

        var feedbackElementEnglish = $("<td>");
        if(isCorrect) {
            feedbackElementEnglish.text(englishTranslation);
        } else {
            var feedbackElementEnglishStrike = $("<strike>").text(englishTranslation);
            feedbackElementEnglish.append(feedbackElementEnglishStrike);
        }

        feedbackElementEnglish.addClass(isCorrect ? "correct" : "incorrect");

        var feedbackIsCorrect = $("<td>").text(isCorrect ? "✔" : word);
        feedbackIsCorrect.addClass(isCorrect ? "correct" : "incorrect");

        var previousEntries = $("<tr>");
        previousEntries.append(feedbackElementSpanish);
        previousEntries.append(feedbackElementEnglish);
        previousEntries.append(feedbackIsCorrect);

        $("#previous_entries tr:first").after(previousEntries);
    }

    // Event handler for the "See Answer" button
    $("#seeAnswerButton").click(function() {
        provideFeedback();
        displayRandomWord();
    });

    // Event handler for pressing enter in the input field
    $("#english").on("keydown", function(event) {
        if (event.keyCode === $.ui.keyCode.ENTER) {
            event.preventDefault();

            var selectedWord = $(this).val().trim();
            if (selectedWord !== "") {
                $("#english").val(selectedWord); // Set the entered value as the input value
            } else {
                $("#english").val(" \n");
            }

            provideFeedback(); // Check if the translation is correct and provide feedback
            displayRandomWord(); // Display a new random Spanish word
        }
    });

    // Initial setup
    $("#lang_from").text(lang_from);
    $("#lang_to").text(lang_to);
    $("#from_language").text(lang_from);
    $("#to_language").text(lang_to);

    // Display the first random Spanish word
    displayRandomWord();

    // Autocomplete widget setup
    $("#english").autocomplete({
        minLength: 2, // Show suggestions after typing at least two characters
        source: function(request, response) {
            var searchTerm = request.term.toLowerCase();
            var suggestions = Object.keys(current_dict).filter(function(word) {
                return word.toLowerCase().indexOf(searchTerm) !== -1;
            });
            response(suggestions);
        },
        select: function(event, ui) {
            event.preventDefault();
            var selectedWord = ui.item.value;

            $("#english").val(selectedWord); // Set the selected suggestion as the input value

            if(event.button === 0) {
                provideFeedback(); // Check if the translation is correct and provide feedback
                displayRandomWord(); // Display a new random Spanish word
            }

            $("#english").val("").focus();
            return false;
        }
    });

    // Add the logout button functionality
    $(".logout-button").click(function() {
        // Clear any session or local data if necessary
        sessionStorage.clear();
        localStorage.clear();

        // Redirect to the login page
        window.location.href = './index.html'; // Adjust the path as needed
    });
});


	