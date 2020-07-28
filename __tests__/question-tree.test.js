import { QuestionTree } from '../src/question-tree';
import { Node } from '../src/node';

describe("QUESTION TREE", () => {

    let qTree = new QuestionTree();
    let expectedResult = new QuestionTree();
    let newQ;
    let newA;
    let currentNode;
    const YES = "Yes";
    const NO = "No";

    test("Creates an instance of QuestionTree", () => {
        expect(qTree).toBeInstanceOf(QuestionTree);
    });

    test("Property of new QuestionTree instance should be a Node object", () => {
        expect(qTree.root).toBeInstanceOf(Node);
    });

    test("New QuestionTree instance should store null as its root's question value", () => {
        expect(qTree.root.question).toBeNull();
    });

    test("New QuestionTree instance should store 'Computer' as its root's answer value", () => {
        expect(qTree.root.answer).toEqual("Computer");
    });

    


    // INSERT NEW Q&A METHOD ===============================
    describe("INSERT NEW Q&A", () => {
        test("Insert #1: insertNewQA method on a new tree should replace the root with a new Question node, the new root will have new children: the new Answer node and the old root", () => {
            currentNode = qTree.root;
            newQ = "Is it an animal?";
            newA = "kangaroo";
            qTree.insertNewQA(currentNode, newQ, YES, newA);

            expectedResult.root = new Node(newQ, null);
            expectedResult.root.yes = new Node(null, newA);
            expectedResult.root.no = new Node(null, "Computer");
            
            expect(qTree.root).toEqual(expectedResult.root);
        });

        test("Insert #2: Inserting new question and answer nodes should be placed correctly in the tree", () => {
            currentNode = qTree.root.yes;
            newQ = "Does it move slowly?";
            newA = "sloth";
            qTree.insertNewQA(currentNode, newQ, YES, newA);

            expectedResult.root.yes = new Node(newQ, null);
            expectedResult.root.yes.yes = new Node(null, newA);
            expectedResult.root.yes.no = new Node(null, "kangaroo");

            expect(qTree.root).toEqual(expectedResult.root);
        });

        test("Insert #3: Inserting new question and answer nodes should continue to modify the tree appropriately", () => {            
            currentNode = qTree.root.yes.no;
            newQ = "Does it jump skillfully?";
            newA = "cheetah";
            qTree.insertNewQA(currentNode, newQ, NO, newA);

            expectedResult.root.yes.no = new Node(newQ, null);
            expectedResult.root.yes.no.no = new Node(null, newA);
            expectedResult.root.yes.no.yes = new Node(null, "kangaroo");

            expect(qTree).toEqual(expectedResult);
        });

        test("Insert #4: Inserting new question and answer nodes to the right side of the tree should also continue to modify the tree appropriately", () => {            
            currentNode = qTree.root.no;
            newQ = "Is it an object?";
            newA = "programmer";
            qTree.insertNewQA(currentNode, newQ, NO, newA);

            expectedResult.root.no = new Node(newQ, null);
            expectedResult.root.no.no = new Node(null, newA);
            expectedResult.root.no.yes = new Node(null, "Computer");

            expect(qTree).toEqual(expectedResult);
        });
    });

   


    // IS YES METHOD ========================================
    describe("ISYES METHOD", () => {
        test("isYes method should return true for yesses", () => {
            expect(qTree.isYes(YES)).toEqual(true);
        });
    
        test("isYes method should return false for nos", () => {
            expect(qTree.isYes(NO)).toEqual(false);
        });
    });




    // POP LEAF NODES =======================================
    describe("POP METHOD", () => {
        let testTree;

        beforeEach(() => {
            testTree = new QuestionTree();
        });
    
        test("When pop method is used on a tree that only consists a root node, it should return the root and leave the root property as null", () => {
            let expectedResult = new Node(null, "Computer");
    
            expect(testTree.pop(testTree.root)).toEqual(expectedResult);
            expect(testTree.root).toBeNull();
        });
    
        test("When the tree is empty, the pop method should return null", () => {
            testTree.pop(testTree.root);
    
            let nodeToPop = new Node(null, "Computer");
    
            expect(testTree.pop(nodeToPop)).toBeNull();
        });
    
        test("If no parameter is passed into the pop method, it should return null", () => {
            expect(testTree.pop()).toBeNull();
        });
    
        test("Given a nodeToPop object as a parameter, the pop method should return the nodeToPop object", () => {
            testTree.root = new Node("Is it an animal?", null);
            testTree.root.yes = new Node(null, "kangaroo");
            testTree.root.no = new Node(null, "Computer");
            let nodeToPop = testTree.root.yes;
    
            let expectedResult = new Node(null, "kangaroo");
            expect(testTree.pop(nodeToPop)).toEqual(expectedResult);
        });

        test("Popping a node out should modify the tree correctly", () => {
            testTree.root = new Node("Is it an animal?", null);
            testTree.root.yes = new Node("Does it move slowly?", null);
            testTree.root.no = new Node(null, "Computer");
            testTree.root.yes.yes = new Node(null, "sloth");
            testTree.root.yes.no = new Node(null, "kangaroo");
            let nodeToPop = testTree.root.yes.no;
            testTree.pop(nodeToPop)
    
            let expectedTree = new QuestionTree();
            expectedTree.root = new Node("Is it an animal?", null);
            expectedTree.root.yes = new Node("Does it move slowly?", null);
            expectedTree.root.no = new Node(null, "Computer");
            expectedTree.root.yes.yes = new Node(null, "sloth");
            expectedTree.root.yes.no = null;
            
            expect(testTree).toEqual(expectedTree);
        });
    });
     


});