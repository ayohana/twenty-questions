import { QuestionTree } from '../src/question-tree';
import { Node } from '../src/node';

describe("QuestionTree", () => {

    let qTree = new QuestionTree();
    let expectedResultTree = new QuestionTree();
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

    test("New QuestionTree instance should store 'computer' as its root's answer value", () => {
        expect(qTree.root.answer).toEqual("computer");
    });

    


    // INSERT NEW Q&A METHOD ===============================
    describe("INSERT NEW Q&A", () => {
        test("insertNewQA method on a new tree should replace the root with a new Question node, the new root will have new children: the new Answer node and the old root", () => {
            currentNode = qTree.root;
            newQ = "Is it an animal?";
            newA = "kangaroo";
            qTree.insertNewQA(currentNode, newQ, YES, newA);

            expectedResultTree.root = new Node(newQ, null);
            expectedResultTree.root.yes = new Node(null, newA);
            expectedResultTree.root.no = new Node(null, "computer");
            
            expect(qTree.root).toEqual(expectedResultTree.root);
        });

        // test("insertNewQA method should replace the root/old leaf node with a new question node, then the new root should have the old leaf and the new answer node as its children", () => {
        //     currentNode = qTree.root;
        //     newQ = "Is it an animal?";
        //     newA = "kangaroo";
        //     qTree.insertNewQA(currentNode, newQ, YES, newA);

        //     expectedResultTree.root = new Node(newQ, null);
        //     expectedResultTree.root.yes = new Node(null, newA);
        //     expectedResultTree.root.no = new Node(null, "computer");

        //     expect(qTree).toEqual(expectedResultTree);
        // });

        // test("insertNewQA method should continue to modify the tree appropriately", () => {
        //     currentNode = qTree.root.yes;
        //     newQ = "Does it move slowly?";
        //     newA = "sloth";
        //     qTree.insertNewQA(currentNode, newQ, YES, newA);

        //     expectedResultTree.root.yes = new Node(newQ, null);
        //     expectedResultTree.root.yes.yes = new Node(null, newA);
        //     expectedResultTree.root.yes.no = new Node(null, "kangaroo");

        //     expect(qTree).toEqual(expectedResultTree);
        // });

        // test("insertNewQA method should continue to modify the tree appropriately", () => {
        //     currentNode = qTree.root.yes.no;
        //     newQ = "Does it jump skillfully?";
        //     newA = "cheetah";
        //     qTree.insertNewQA(currentNode, newQ, NO, newA);

        //     expectedResultTree.root.yes.no = new Node(newQ, null);
        //     expectedResultTree.root.yes.no.no = new Node(null, newA);
        //     expectedResultTree.root.yes.no.yes = new Node(null, "kangaroo");
            
        //     expect(qTree).toEqual(expectedResultTree);

        // });

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
            let expectedResult = new Node(null, "computer");
    
            expect(testTree.pop(testTree.root)).toEqual(expectedResult);
            expect(testTree.root).toBeNull();
        });
    
        test("When the tree is empty, the pop method should return null", () => {
            testTree.pop(testTree.root);
    
            let nodeToPop = new Node(null, "computer");
    
            expect(testTree.pop(nodeToPop)).toBeNull();
        });
    
        test("If no parameter is passed into the pop method, it should return null", () => {
            expect(testTree.pop()).toBeNull();
        });
    
        test("Given a nodeToPop object as a parameter, the pop method should return the nodeToPop object", () => {
            testTree.root = new Node("Is it an animal?", null);
            testTree.root.yes = new Node(null, "kangaroo");
            testTree.root.no = new Node(null, "computer");
            let nodeToPop = testTree.root.yes;
    
            let expectedResult = new Node(null, "kangaroo");
            expect(testTree.pop(nodeToPop)).toEqual(expectedResult);
        });

        test("Popping a node out should modify the tree correctly", () => {
            testTree.root = new Node("Is it an animal?", null);
            testTree.root.yes = new Node("Does it move slowly?", null);
            testTree.root.no = new Node(null, "computer");
            testTree.root.yes.yes = new Node(null, "sloth");
            testTree.root.yes.no = new Node(null, "kangaroo");
            let nodeToPop = testTree.root.yes.no;
            testTree.pop(nodeToPop)
    
            let expectedTree = new QuestionTree();
            expectedTree.root = new Node("Is it an animal?", null);
            expectedTree.root.yes = new Node("Does it move slowly?", null);
            expectedTree.root.no = new Node(null, "computer");
            expectedTree.root.yes.yes = new Node(null, "sloth");
            expectedTree.root.yes.no = null;
            
            expect(testTree).toEqual(expectedTree);
        });
    });
     


});