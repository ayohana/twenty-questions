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

        // Clicking yes/no will display the next question
        // TODO: Will also check if game is over when the computer's asking its last question
        $("#yesBtn").click(function() {
            yesOrNo = "Yes";
            displayNextQuestion();            
        });
        $("#noBtn").click(function() {
            yesOrNo = "No";
            displayNextQuestion(); 
        });

        
        // If there is a next node, display its text
        // ?TODO: If next node is null, then display game over text
        function displayNextQuestion() {            
            game.setCurrentNode(yesOrNo);      
            let currentNode = game.getCurrentNode();
            console.log("currentNode", currentNode);
            let text;
            if (!currentNode && isGameOver()) {
                displayGameOver();
                return;
            }
            if (currentNode.question) {
                text = currentNode.question;
            } else if (currentNode.answer) {
                text = `Are you thinking of: ${currentNode.answer}?`;
            }          
            $("#textOutput").html(text);                        
            game.setQuestionsCounter();
            console.log("round #", game.getQuestionsCounter());
        }

        // Displays text of game over and who wins
        function displayGameOver() {           
            if (yesOrNo == "Yes") {
                $("#textOutput").html("Hooray, I win!");
                game.setCompWinsGame();
                $("#startNextRoundBtn").slideDown(500);
            } else {
                $("#textOutput").html("Drat, I lost.");
                game.setPlayerWinsGame();
                displayForm();
            }
            $("#yesOrNoButtons").hide();
            $("#playerScore").html(game.getPlayerWins());
            $("#computerScore").html(game.getComputerWins());
            yesOrNo = null;
        }

        // Returns true if a condition of the end of a round is met, otherwise returns false
        function isGameOver() {
            // The round is over when we have reached 20 questions or when we are currently on a leaf node
            if (game.getQuestionsCounter() > 20 || game.currentNodeIsLeafNode()) {
                game.resetQuestionsCounter();
                return true;
            }
            return false;
        }
     

    });

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