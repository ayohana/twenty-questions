import './styles.css' ;
import $ from 'jquery';
import { Game } from '../src/game';

$(document).ready(function() {

    let game = new Game();
    const YES = "Yes";
    const NO = "No";

    $("#gameDiv").hide();

    // Clicking the start new game/start next round button will trigger the following chain of events
    $("#startBtn, #startNextRoundBtn").click(function() {
        $("#startBtn").hide();
        $("#gameDiv").slideDown(500);
        $("#yesOrNoButtons").slideDown(500);
        $("#startNextRoundBtn").hide();
        $("#inputDiv").hide();

        // Display the first question from root node
        displayNextQuestion();

        // Returns true if a condition of the end of a round is met, otherwise returns false
        // function isGameOver() {
        //     // The round is over when we have reached 20 questions or when we are currently on a leaf node
        //     if (game.getQuestionsCounter() > 20 || game.currentNodeIsLeafNode()) {
        //         game.resetQuestionsCounter();
        //         return true;
        //     }
        //     return false;
        // }
     

    });

    // Clicking yes/no will display the next question
    // If there is no next question, display the winner
    $("#yesBtn").click(function() {
        displayNextQuestion(YES)
        if (game.getIsLastQuestion()) {
            displayWinner(YES);   
        }        
    });

    $("#noBtn").click(function() {
        displayNextQuestion(NO)
        if (game.getIsLastQuestion()) {
            displayWinner(NO);   
        } 
    });

    
    // If there is a next node, display its text
    // Otherwise, return null
    // TODO: After winning, currentNode should revert back to root!
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

    let yesOrNo, newQuestion, newAnswer;

    $("form#newAnswer").submit(function(event) {
        event.preventDefault();
        newAnswer = $("#fieldNewAnswer").val();
        $("form#newAnswer").hide();
        $("form#newQuestion").slideDown(500);
    });

    $("form#newQuestion").submit(function(event) {
        event.preventDefault();
        newQuestion = $("#fieldNewQuestion").val();
        $("form#newQuestion").hide();
        $("form#yesOrNo").slideDown(500);
    });

    // TODO: Check if Tree is updated correctly!
    $("form#yesOrNo").submit(function(event) {
        event.preventDefault();
        yesOrNo = $("#fieldYesOrNo").val();
        game.setNewNodes(newQuestion, yesOrNo, newAnswer);
        console.log("Tree's root", game.questionTree.root);
        $("#textOutput").html("New object is saved. Challenge me again!");
        $("form#yesOrNo").hide();
        $("#startNextRoundBtn").slideDown(500);
    });

});