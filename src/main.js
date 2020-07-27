import './styles.css' ;
import $ from 'jquery';
import { Game } from '../src/game';

$(document).ready(function() {

    let game = new Game();
    const YES = "Yes";
    const NO = "No";

    $("#gameDiv").hide();
    $("#startNextRoundBtn").hide();

    // Clicking the start new game/start next round button will trigger the following chain of events
    // TODO: if cookie exists, warn user if they want to overwrite their last save
    $("#startBtn, #startNextRoundBtn").click(function() {
        startGame();
    });

    $("#continueBtn").click(function() {
        if (!cookieExists()) {
            alert("No save detected. Enable your cookies and start a new game to create a new save!");
        } else {
            game = getCookie();
            console.log(game);
            startGame();
        }
    });

    // Clicking yes/no will display the next question
    // If there is no next question, display the winner
    $("#yesBtn").click(function() {
        displayNextQuestion(YES);
        if (game.getIsLastQuestion()) {
            displayWinner(YES);   
        }        
    });

    $("#noBtn").click(function() {
        displayNextQuestion(NO);
        if (game.getIsLastQuestion()) {
            displayWinner(NO);   
        } 
    });

    function startGame() {
        $("#startBtn, #welcomeContainer, #inputDiv, #startNextRoundBtn, #pointsDiv, #continueBtn").hide();
        $("#gameDiv").slideDown(500);
        $("#yesOrNoButtons").slideDown(500);

        // Resets current node at the start of a new round
        game.resetCurrentNode();

        // Display the first question from root node
        displayNextQuestion();
    }

    
    // If there is a next node, display its text
    // Otherwise, return null
    // TODO: Questions counter should increment correctly!
    function displayNextQuestion(yesOrNo) {                
        let text = game.getNextQuestion(yesOrNo);
        if (!text) {
            return null;
        }      
        $("#textOutput").html(text);                        
        console.log("round #", game.getQuestionsCounter());
        console.log("currentNode", game.getCurrentNode());
    }

    // Displays winner and scoreboard
    function displayWinner(yesOrNo) {                        
        if (game.isComputerWinner(yesOrNo)) {
            $("#textOutput").html("Hooray, I win!");
            $("#startNextRoundBtn, #pointsDiv").slideDown(500);
        } else {
            $("#textOutput").html("Drat, I lost.");
            displayForm();
        }
        game.resetQuestionsCounter();
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
        $(".currentNodeAnswer").html(`"${prevAnswer}"`);
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
        console.log("Tree's root", game.questionTree.root);
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
        setCookie(game.questionTree.root);
    });

    function setCookie(cvalue) {
        // let rootObject = JSON.parse(cvalue);
        let rootObject = JSON.stringify(cvalue);

        // Set cookie to expire in 7 days
        let date = new Date();
        date.setTime(date.getTime() + (7*24*60*60*1000));
        let expires = `expires=${date.toUTCString()}`;     
        document.cookie = `game=${rootObject};${expires};path=/`;
    }

    function getCookie() {
        let decodedCookieArr = document.cookie.split(";");
        let cookieValue = decodedCookieArr.find(row => row.startsWith("game")).split("=")[1];
        return JSON.parse(cookieValue);       
    }

    function cookieExists() {
        if (document.cookie) {
            return true;
        } else {
            return false;
        }
    }

});