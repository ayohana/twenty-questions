import './styles.css' ;
import $ from 'jquery';
import { Game } from '../src/game';

function getQuestionText(currentNode) {
    if (!currentNode) return "Text unavailable!";
    if (currentNode.question) return currentNode.question;
    if (currentNode.answer) return `Are you thinking of: ${currentNode.answer}?`;    
}

$(document).ready(function() {

    let game = new Game();
    let questionsCounter = 0;
    let yesOrNo = null;

    $("#gameDiv").hide();

    $("#startBtn").click(function() {
        $("#startBtn").slideToggle(250);
        $("#gameDiv").slideToggle(500);
        $("#startNextRoundBtn").hide();
        displayNextQuestion();
        $("#yesBtn").click(function() {
            yesOrNo = "Yes";
            if (!isGameOver()) {
                displayNextQuestion();   
            } else {
                displayGameOver();
            }
            
        });
        $("#noBtn").click(function() {
            yesOrNo = "No";
            if (!isGameOver()) {
                displayNextQuestion();   
            } else {
                displayGameOver();
            }
        });

        
        // Displays text of next question
        function displayNextQuestion() {            
            game.setCurrentNode(yesOrNo);            
            $("#textOutput").html(getQuestionText(game.getCurrentNode()));                        
            questionsCounter += 1;
            console.log("round #", questionsCounter);
            console.log("currentNode", game.getCurrentNode());
        }

        // Displays text of game over and who wins
        function displayGameOver() {           
            if (yesOrNo == "Yes") {
                $("#textOutput").html("Game over. You lose!");
            } else {
                $("#textOutput").html("Game over. You win!");
            }
            $("#yesOrNoButtons").hide();
            $("#startNextRoundBtn").slideToggle(250);
        }

        // Returns true if a condition of the end of a round is met, otherwise returns false
        function isGameOver() {
            // The round is over when we have reached 20 questions or when we are currently on a leaf node
            if (questionsCounter > 20 || game.currentNodeIsLeafNode()) {
                questionsCounter = 0;
                return true;
            }
            return false;
        }

    });

});