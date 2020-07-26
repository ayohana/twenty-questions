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
    $("#startBtn, #startNextRoundBtn").click(function() {
        $("#startBtn, #welcomeContainer, #inputDiv, #startNextRoundBtn").hide();
        $("#gameDiv").slideDown(500);
        $("#yesOrNoButtons").slideDown(500);

        // Resets current node at the start of a new round
        game.resetCurrentNode();

        // Display the first question from root node
        displayNextQuestion();
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
            $("#startNextRoundBtn").slideDown(500);
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
        $("#startNextRoundBtn").slideDown(500);

        // Resetting these values after submission prevents errors
        yesOrNo = "";
        newQuestion = "";
        newAnswer = "";

        // Resets form fields after submission
        document.getElementById("newAnswer").reset();
        document.getElementById("newQuestion").reset();
        document.getElementById("yesOrNo").reset();
    });

});