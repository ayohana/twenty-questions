import './styles.css' ;
import $ from 'jquery';
import { Game } from '../src/game';

$(document).ready(function() {

    let game = new Game();
    const YES = "Yes";
    const NO = "No";

    $("#gameDiv").hide();
    $("#startNextRoundBtn, #confirmMessage").hide();

    $("#startBtn").click(function() {
        if (!cookieExists()) {
            startGame();
        } else {
            $("#lastSaveDateTime").html(getLastDateSaved());
            $("#confirmMessage").show();
            $("#welcomeMessage, #startBtn, #continueBtn").hide();
        }
    });

    $("#newSaveBtn, #startNextRoundBtn").click(function() {
        startGame();
    });

    $("#cancelNewSaveBtn").click(function() {
        $("#confirmMessage").hide();
        $("#welcomeMessage, #startBtn, #continueBtn").show();
    });

    $("#continueBtn").click(function() {
        if (!cookieExists()) {
            alert("No save detected. Enable your cookies and start a new game to create a new save!");
        } else {
            game = parseCookieToObject();
            startGame();
        }
    });

    // Clicking yes/no will display the next question
    // If there is no next question, display the winner
    $("#yesBtn").click(function() {
        if (game.getIsLastQuestion()) {
            game.resetQuestionsCounter();
            displayWinner(YES);   
        } else {
            displayNextQuestion(YES);
        }
    });

    $("#noBtn").click(function() {
        if (game.getIsLastQuestion()) {
            game.resetQuestionsCounter();
            displayWinner(NO);   
        } else {
            displayNextQuestion(NO); 
        }
    });

    function startGame() {
        $("#startBtn, #welcomeContainer, #inputDiv, #startNextRoundBtn, #pointsDiv, #continueBtn").hide();
        $("#gameDiv, #yesOrNoButtons").slideDown(500);

        // Resets current node at the start of a new round
        game.resetCurrentNode();

        // Display the first question from root node
        displayNextQuestion();
    }

    
    // If there is a next node, display its text
    // Otherwise, return null
    function displayNextQuestion(yesOrNo) {                
        let text = game.getNextQuestion(yesOrNo);
        if (!text) {
            return null;
        }
        $("#textOutput").html(`Q#${game.getQuestionsCounter()} ${text}`);      
    }

    // Displays winner and scoreboard, then save the game
    function displayWinner(yesOrNo) {                  
        if (game.currentNodeIsLeafNode() && game.evalFinalAnswer(yesOrNo)) {
            game.setCompWinsGame();
            $("#textOutput").html("Hooray, I win!");
            $("#startNextRoundBtn, #pointsDiv").slideDown(500);
        } else if (game.currentNodeIsLeafNode() && !game.evalFinalAnswer(yesOrNo)) {
            game.setPlayerWinsGame();
            $("#textOutput").html("Drat, I lost.");
            displayForm();
        } else {
            game.setPlayerWinsGame();
            $("#textOutput").html(`Drat, I've asked ${game.getMaxQuestions()} questions.`);
            displayForm();
        }
        setCookie(game);
        displayScores();
    }

    function displayScores() {
        $("#yesOrNoButtons").hide();
        $("#playerScore").html(game.getPlayerWins());
        $("#computerScore").html(game.getComputerWins());
    }

    // Triggers a chain of show/hide forms to get user input
    function displayForm() {
        $("#inputDiv").show();
        $("form#newAnswer").show();
        $("form#newQuestion").hide();
        $("form#yesOrNo").hide();
    }

    let yesOrNo, newQuestion, newAnswer, prevAnswer;
    
    $("form#newAnswer").submit(function(event) {
        event.preventDefault();
        newAnswer = $("#fieldNewAnswer").val();
        prevAnswer = game.getCurrentNodeAnswer();
        
        $("form#newAnswer").hide();
        $("form#newQuestion").slideDown(500);
        $(".userNewAnswer").html(`"${newAnswer}"`);
        if (!prevAnswer) {
            $(".currentNodeAnswer").html(``);
        } else {
            $(".currentNodeAnswer").html(` from "${prevAnswer}"`);
        }
    });

    $("form#newQuestion").submit(function(event) {
        event.preventDefault();
        newQuestion = $("#fieldNewQuestion").val();
        $("form#newQuestion").hide();
        $("form#yesOrNo").slideDown(500);
    });

    $("form#yesOrNo").submit(function(event) {
        event.preventDefault();
        yesOrNo = $("#fieldYesOrNo").val();
        game.setNewNodes(newQuestion, yesOrNo, newAnswer);
        
        $("#textOutput").html(`"${newAnswer}" is saved. Challenge me again!`);
        $("form#yesOrNo").hide();
        $("#startNextRoundBtn, #pointsDiv").slideDown(500);

        // Resetting these values after submission prevents errors
        yesOrNo = "";
        newQuestion = "";
        newAnswer = "";

        // Resets form fields after submission
        document.getElementById("newAnswer").reset();
        document.getElementById("newQuestion").reset();
        document.getElementById("yesOrNo").reset();

        // After completing the forms, save the game
        setCookie(game);
    });

    function setCookie(cvalue) {
        let gameObject = JSON.stringify(cvalue);

        // Set cookie to expire in 7 days
        let date = new Date();
        date.setTime(date.getTime() + (7*24*60*60*1000));
        let expires = `expires=${date.toUTCString()}`;     
        document.cookie = `game=${gameObject}`;
        document.cookie = `datesaved=${date}`;
        document.cookie = `${expires}`;
        document.cookie = `path=/`;
    }

    function getLastDateSaved() {
        let decodedCookieArr = document.cookie.split("; ");
        let cookieValue = decodedCookieArr.find(row => row.startsWith("datesaved")).split("=")[1];
        let dateSaved = new Date(cookieValue);
        return `${dateSaved.toLocaleDateString()} at ${dateSaved.toLocaleTimeString()}`;        
    }

    function getLastGame() {
        let decodedCookieArr = document.cookie.split("; ");
        let cookieValue = decodedCookieArr.find(row => row.startsWith("game")).split("=")[1];
        return JSON.parse(cookieValue);        
    }

    function parseCookieToObject() {
        let cookieObject = getLastGame();
        let lastSave = new Game();
        for (let key in cookieObject) {
            if (key == "questionTree") {
                lastSave[key].root = cookieObject[key].root;
            } else {
                lastSave[key] = cookieObject[key];
            }
        }
        return lastSave;
    }

    function cookieExists() {
        if (document.cookie) {
            return true;
        } else {
            return false;
        }
    }

});