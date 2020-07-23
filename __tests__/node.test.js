import { Node } from '../src/node';

describe ("Node", () => {

    let newQuestionNode;
    let newAnswerNode;

    test("Creates an instance of Node", () => {
        newQuestionNode = new Node("Is it an animal?", null);
        expect(newQuestionNode).toBeInstanceOf(Node);
    });

    test("Data type of question property of newQuestionNode should be a string", () => {
        expect.objectContaining({
            question: expect.any(String)
        });
    });

    test("Data type of answer property of newQuestionNode should be null", () => {
        expect(newQuestionNode.answer).toBeNull();
    });

    test("Creates an instance of Node", () => {
        newAnswerNode = new Node(null, "computer");
        expect(newAnswerNode).toBeInstanceOf(Node);
    });

    test("Data type of answer property of newAnswerNode should be a string", () => {
        expect.objectContaining({
            answer: expect.any(String)
        });
    });

    test("Data type of question property of newAnswerNode should be null", () => {
        expect(newAnswerNode.question).toBeNull();
    });

});