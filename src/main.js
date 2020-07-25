import './styles.css' ;
import $ from 'jquery';
import { Game } from '../src/game';

$(document).ready(function() {

    let game = new Game();
    let yesOrNo = null;
    let newQuestion, newAnswer;

    $("#gameDiv").hide();

    // Clicking the start new game/start next round button will trigger the following chain of events
    $("#startBtn, #startNextRoundBtn").click(function() {
        $("#startBtn").hide();
        $("#gameDiv").slideDown(500);
        $("#yesOrNoButtons").slideDown(500);
        $("#startNextRoundBtn").hide();
        $("#inputDiv").hide();

        // Display the root's question
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
    // TODO: Will also check if game is over when the computer's asking its last question
    $("#yesBtn").click(function() {
        const YES = "Yes";
        if (!displayNextQuestion(YES)) {
            displayWinner(YES);   
        }        
    });
    $("#noBtn").click(function() {
        const NO = "No";
        if (!displayNextQuestion(NO)) {
            displayWinner(NO);   
        }  
    });

    
    // If there is a next node, display its text
    // ?TODO: If next node is null, then display game over text
    function displayNextQuestion(yesOrNo) {                
        let text = game.getNextQuestion(yesOrNo);
        if (!text) {
            return null;
        }      
        $("#textOutput").html(text);                        
        console.log("round #", game.getQuestionsCounter());
        console.log("text", text);
    }

    // Displays text of game over and who wins
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

    $("form#yesOrNo").submit(function(event) {
        event.preventDefault();
        let inputYesOrNo = $("#fieldYesOrNo").val();
        game.setNewNodes(newQuestion, inputYesOrNo, newAnswer);
        console.log("Tree's root", game.questionTree.root);
        $("form#yesOrNo").hide();
        $("#startNextRoundBtn").slideDown(500);
    });

});