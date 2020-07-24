import { Game } from '../src/game';
import { QuestionTree } from '../src/question-tree';

describe("GAME", () => {

    let testGame = new Game();
    let expectedResultGame = new Game();
    let newQ;
    let newA;
    const YES = "Yes";
    const NO = "No";

    test("Creates an instance of Game", () => {
        expect(testGame).toBeInstanceOf(Game);
    });

    test("Properties of instance should have the correct data types", () => {
        expect(testGame).toEqual(expect.objectContaining({
            questionTree: expect.any(QuestionTree),
            computerWins: expect.any(Number),
            playerWins: expect.any(Number)           
        }));
        expect(testGame.currentNode).toBeNull();
    });




    // POINTS GETTERS & SETTERS ======================
    describe("GETTING POINTS", () => {
        test("getPlayerWins method should return property playerWins", () => {            
            expect(testGame.getPlayerWins()).toEqual(0);
        });
    
        test("getComputerWins method should return property computerWins", () => {            
            expect(testGame.getComputerWins()).toEqual(0);
        });
    });

    describe("SETTING POINTS", () => {
        test("setPlayerWinsGame method should increment property playerWins", () => {
            testGame.setPlayerWinsGame();
            expect(testGame.playerWins).toEqual(1);
        });
    
        test("setCompWinsGame method should increment property computerWins", () => {
            testGame.setCompWinsGame();
            expect(testGame.computerWins).toEqual(1);
        });
    });

    describe("GETTING POINTS", () => {
        test("getPlayerWins method should return property playerWins", () => {            
            expect(testGame.getPlayerWins()).toEqual(1);
        });
    
        test("getComputerWins method should return property computerWins", () => {            
            expect(testGame.getComputerWins()).toEqual(1);
        });
    });
    



    // NODES GETTERS & SETTERS ========================
    describe("GETTING & SETTING NODES", () => {
        test("getNextNode method should return the next node", () => {
            expect(testGame.getNextNode()).toEqual(testGame.questionTree.root);
        });

        test("setNewNodes method should insert two new nodes correctly into the question tree property", () => {
            newQ = "Is it an animal?";
            newA = "kangaroo"
            testGame.setNewNodes(newQ, YES, newA);

            expectedResultGame.questionTree.root = new Node(newQ, null);
            expectedResultGame.questionTree.root.yes = new Node(null, newA);
            expectedResultGame.questionTree.root.no = new Node(null, "computer");

            expect(testGame.questionTree.root).toEqual(expectedResultGame.questionTree.root);
        });

        test("After setting new nodes, currentNode property should be reset to null", () => {
            expect(testGame.currentNode).toBeNull();
        });

        test("Invoke #1: given no params, getNextNode method should return the root", () => {
            expect(testGame.getNextNode()).toEqual(testGame.questionTree.root);
        });

        test("Invoke #2: getNextNode method should return the next node", () => {
            expect(testGame.getNextNode(YES)).toEqual(expectedResultGame.questionTree.root.yes);
        });
    });

});