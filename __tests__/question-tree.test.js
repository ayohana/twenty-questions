import { QuestionTree } from '../src/question-tree';
import { Node } from '../src/node';

describe("QuestionTree", () => {

    let qTree = new QuestionTree();
    let expectedResultTree = new QuestionTree();
    let newQ;
    let newA;
    let currentNode;
    const NEW_YES = "Yes";
    const NEW_NO = "No";

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

    // test("insertNewQA method should replace the root/old leaf node with a new question node, then the new root should have the old leaf and the new answer node as its children", () => {
    //     currentNode = qTree.root;
    //     newQ = "Is it an animal?";
    //     newA = "kangaroo";
    //     qTree.insertNewQA(currentNode, newQ, NEW_YES, newA);

    //     expectedResultTree.root = new Node(newQ, null);
    //     expectedResultTree.root.yes = new Node(null, newA);
    //     expectedResultTree.root.no = new Node(null, "computer");

    //     expect(qTree).toEqual(expectedResultTree);
    // });

    // test("insertNewQA method should continue to modify the tree appropriately", () => {
    //     currentNode = qTree.root.yes;
    //     newQ = "Does it move slowly?";
    //     newA = "sloth";
    //     qTree.insertNewQA(currentNode, newQ, NEW_YES, newA);

    //     expectedResultTree.root.yes = new Node(newQ, null);
    //     expectedResultTree.root.yes.yes = new Node(null, newA);
    //     expectedResultTree.root.yes.no = new Node(null, "kangaroo");

    //     expect(qTree).toEqual(expectedResultTree);
    // });

    // test("insertNewQA method should continue to modify the tree appropriately", () => {
    //     currentNode = qTree.root.yes.no;
    //     newQ = "Does it jump skillfully?";
    //     newA = "cheetah";
    //     qTree.insertNewQA(currentNode, newQ, NEW_NO, newA);

    //     expectedResultTree.root.yes.no = new Node(newQ, null);
    //     expectedResultTree.root.yes.no.no = new Node(null, newA);
    //     expectedResultTree.root.yes.no.yes = new Node(null, "kangaroo");
        
    //     expect(qTree).toEqual(expectedResultTree);

    // });

    test("isYes method should return true for yesses", () => {
        expect(qTree.isYes(NEW_YES)).toEqual(true);
    })

    test("isYes method should return false for nos", () => {
        expect(qTree.isYes(NEW_NO)).toEqual(false);
    })

    test("pop method should modify the tree and returns the popped leaf node", () => {
        let testTree = new QuestionTree();
        let nodeToPop = new Node(null, "popthisnode");
        testTree.root.yes = nodeToPop;

        expect(testTree.pop(nodeToPop)).toEqual(nodeToPop);
    })


});