import { QuestionTree } from '../src/question-tree';
import { Node } from '../src/node';

describe("QuestionTree", () => {

    let qTree = new QuestionTree();
    let expectedResultTree = new QuestionTree();
    let newQ;
    let newA;
    const NEW_YES = "yes";
    const NEW_NO = "no";

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

    test("insertNewQA method should replace the root/old leaf node with a new question node, then the new root should have the old leaf and the new answer node as its children", () => {
        newQ = "Is it an animal?";
        newA = "kangaroo";
        qTree.insertNewQA(newQ, NEW_YES, newA);

        expectedResultTree.root = new Node(newQ, null);
        expectedResultTree.root.yes = new Node(null, newA);
        expectedResultTree.root.no = new Node(null, "computer");

        expect(qTree).toEqual(expectedResultTree);
    });

    test("insertNewQA method should continue to modify the tree appropriately", () => {
        newQ = "Does it move slowly?";
        newA = "sloth";
        qTree.insertNewQA(newQ, NEW_YES, newA);

        expectedResultTree.root.yes = new Node(newQ, null);
        expectedResultTree.root.yes.yes = new Node(null, newA);
        expectedResultTree.root.yes.no = new Node(null, "kangaroo");

        expect(qTree).toEqual(expectedResultTree);
    });

    test("insertNewQA method should continue to modify the tree appropriately", () => {
        newQ = "Does it jump skillfully?";
        newA = "cheetah";
        qTree.insertNewQA(newQ, NEW_NO, newA);

        expectedResultTree.root.yes = new Node(newQ, null);
        expectedResultTree.root.yes.yes = new Node(null, "kangaroo");
        expectedResultTree.root.yes.no = new Node(null, newA);

        expect(qTree).toEqual(expectedResultTree);
        
    });


});