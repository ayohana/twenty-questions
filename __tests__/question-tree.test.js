import { QuestionTree } from '../src/question-tree';
import { Node } from '../src/node';

describe("QuestionTree", () => {

    let qTree = new QuestionTree();

    test("Creates an instance of QuestionTree", () => {
        expect(qTree).toBeInstanceOf(QuestionTree);
    });

    test("New QuestionTree instance should store null as its root's question value", () => {
        expect(qTree.root.question).toBeNull();
    });

    test("New QuestionTree instance should store 'computer' as its root's answer value", () => {
        expect(qTree.root.answer).toEqual("computer");
    });

    test("insertNewQA method should replace the root/old leaf node with a new question node, then the new root should have the old leaf and the new answer node as its children", () => {
        const NEW_Q = "Is it an animal?";
        const NEW_A = "kangaroo";
        qTree.insertNewQA(NEW_Q, NEW_A);

        let expectedResultTree = new QuestionTree();
        expectedResultTree.root = new Node("Is it an animal", null);
        expectedResultTree.root.yes = new Node(null, "kangaroo");
        expectedResultTree.root.no = new Node(null, "computer");

        expect(qTree).toEqual(expectedResultTree);
    });


});