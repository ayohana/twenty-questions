export class Node {
    constructor(question, answer) {
        this.question = question;
        this.answer = answer;
        this.yes = null;    // yes = left
        this.no = null;     // no = right
    }
}