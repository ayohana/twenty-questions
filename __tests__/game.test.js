import { Game } from '../src/game';
import { QuestionTree } from '../src/question-tree';
import { Node } from '../src/node';

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
            playerWins: expect.any(Number),
            computerWins: expect.any(Number)         
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
        test("Round #1: getCurrentNode method should return the currentNode property with initial value of null", () => {
            expect(testGame.getCurrentNode()).toBeNull();
        });

        test("Round #1: setCurrentNode method should set the currentNode property starting from the root", () => {
            testGame.setCurrentNode();
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root);
        });

        test("Round #1: getCurrentNode method should return the currentNode property", () => {
            expect(testGame.getCurrentNode(NO)).toEqual(testGame.questionTree.root);
        });

        test("Round #1: setNewNodes method should insert two new nodes correctly into the question tree property", () => {
            newQ = "Is it an animal?";
            newA = "kangaroo"
            testGame.setNewNodes(newQ, YES, newA);

            expectedResultGame.questionTree.root = new Node(newQ, null);
            expectedResultGame.questionTree.root.yes = new Node(null, newA);
            expectedResultGame.questionTree.root.no = new Node(null, "computer");

            expect(testGame.questionTree.root).toEqual(expectedResultGame.questionTree.root);
        });

        test("Round #1: After setting new nodes, currentNode property should be reset to null", () => {
            expect(testGame.currentNode).toBeNull();
        });

        test("Round #2: Invoke #1: given no params, setCurrentNode method set the currentNode property starting from the root", () => {
            testGame.setCurrentNode();
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root);
        });

        test("Round #2: Invoke #2: Given user input of yes/no, setCurrentNode method should set the currentNode property to the correct node", () => {
            testGame.setCurrentNode(YES);
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root.yes);
        });

        test("Round #2: setNewNodes method should insert two new nodes correctly into the question tree property", () => {
            newQ = "Does it move slowly?";
            newA = "sloth";
            testGame.setNewNodes(newQ, YES, newA);

            expectedResultGame.questionTree.root.yes = new Node(newQ, null);
            expectedResultGame.questionTree.root.yes.yes = new Node(null, newA);
            expectedResultGame.questionTree.root.yes.no = new Node(null, "kangaroo");

            expect(testGame.questionTree.root).toEqual(expectedResultGame.questionTree.root);
        });

        test("Round #2: Reset the currentNode property when end of game is reached", () => {
            expect(testGame.getCurrentNode()).toBeNull();
        });

        test("Round #3: Invoke #1: given no params, setCurrentNode method set the currentNode property starting from the root", () => {
            testGame.setCurrentNode();
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root);
        });

        test("Round #3: Invoke #2: Given user input of yes/no, setCurrentNode method should set the currentNode property to the correct node", () => {
            testGame.setCurrentNode(YES);
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root.yes);
        });

        test("Round #3: Invoke #3: Given user input of yes/no, setCurrentNode method should set the currentNode property to the correct node", () => {
            testGame.setCurrentNode(NO);
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root.yes.no);
        });

        test("Round #3: setNewNodes method should insert two new nodes correctly into the question tree property", () => {
            newQ = "Does it jump skillfully?";
            newA = "cheetah";
            testGame.setNewNodes(newQ, NO, newA);

            expectedResultGame.questionTree.root.yes.no = new Node(newQ, null);
            expectedResultGame.questionTree.root.yes.no.no = new Node(null, newA);
            expectedResultGame.questionTree.root.yes.no.yes = new Node(null, "kangaroo");

            expect(testGame.questionTree.root).toEqual(expectedResultGame.questionTree.root);
        });

        test("Round #3: Reset the currentNode property when end of game is reached", () => {
            expect(testGame.getCurrentNode()).toBeNull();
        });

        test("Round #4: Invoke #1: given no params, setCurrentNode method set the currentNode property starting from the root", () => {
            testGame.setCurrentNode();
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root);
        });

        test("Round #4: Invoke #2: Given user input of yes/no, setCurrentNode method should set the currentNode property to the correct node", () => {
            testGame.setCurrentNode(NO);
            expect(testGame.getCurrentNode()).toEqual(testGame.questionTree.root.no);
        });

        test("Round #4: setNewNodes method should insert two new nodes correctly into the question tree property", () => {
            newQ = "Is it an object?";
            newA = "programmer";
            testGame.setNewNodes(newQ, NO, newA);

            expectedResultGame.questionTree.root.no = new Node(newQ, null);
            expectedResultGame.questionTree.root.no.no = new Node(null, newA);
            expectedResultGame.questionTree.root.no.yes = new Node(null, "computer");

            expect(testGame.questionTree.root).toEqual(expectedResultGame.questionTree.root);
        });

        test("Round #4: Reset the currentNode property when end of game is reached", () => {
            expect(testGame.getCurrentNode()).toBeNull();
        });

    });

});