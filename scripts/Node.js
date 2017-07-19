export default class Node {
  constructor(letter = null) {
    this.children = {};
    this.isWord = false;
    this.letter = letter;
    this.frequency = 0;
    this.value = '';
  }
}
