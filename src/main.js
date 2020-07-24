import './styles.css' ;
import $ from 'jquery';
import { Game } from '../src/game';

function displayQuestion(currentNode) {
    if (currentNode.question) return currentNode.question;
    if (currentNode.answer) return `Are you thinking of: ${currentNode.answer}?`;
    return "Text unavailable!";
}

$(document).ready(function() {

    let game = new Game();

    $("#gameDiv").hide();

    $("#startBtn").click(function() {
        $("#startBtn").slideToggle(250);
        $("#gameDiv").slideToggle(500);
        (function playGame() {
            let isGameOver = false;
            let roundCounter = 0;
            while(!isGameOver) {
                game.setCurrentNode();
                $("#question").html(displayQuestion(game.currentNode));
                roundCounter += 1;
                if (roundCounter === 20) {
                    isGameOver = true;
                }
            }
        
        })();

    });

});