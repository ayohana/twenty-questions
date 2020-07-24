import { Game } from '../src/game';
import { QuestionTree } from '../src/question-tree';

describe("GAME", () => {

    let testGame = new Game();
    let expectedResultGame = new Game();

    test("Creates an instance of Game", () => {
        expect(testGame).toBeInstanceOf(Game);
    });

    test("Properties of instance should have the correct data types", () => {
        expect(testGame).toEqual(expect.objectContaining({
            questionTree: expect.any(QuestionTree),
            computerWins: expect.any(Number),
            playerWins: expect.any(Number)           
        }));
    });




    // POINTS GETTERS & SETTERS ======================
    describe("SETTING POINTS", () => {
        test("setPlayerWinsGame method should increment property playerWins", () => {
            testGame.setPlayerWinsGame();
            expect(testGame.playerWins).toEqual(1);
        });
    
        test("setCompWinsGame method should increment property computerWins", () => {
            testGame.setCompWinsGame();
            expect(testGame.computerWins).toEqual(1);
        });

        test("getPlayerWins method should return property playerWins", () => {            
            expect(testGame.getPlayerWins()).toEqual(1);
        });
    
        test("getComputerWins method should return property computerWins", () => {            
            expect(testGame.getComputerWins()).toEqual(1);
        });
    });
    


    // test("play method should traverse the question tree property starting from its root to an answer leaf by asking yes/no questions", () => {
        
    // });

    // test("Given 4 params: the root, user inputs of new answer, new question and its yes/no answer, updateTree method should modify the tree correctly", () => {
    //     testGame.updateTree();
    //     expect(testGame.questionTree).toEqual(expectedResultGame.questionTree);
    // });

    // test("Given the root as a parameter, getNextQuestion method should return the next question node", () => {

    // })


});