import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  insert(data) {

    if (!this.root) {
      this.root = new Node();
    }

    let letters = [...data.toLowerCase()];
    let currentNode = this.root;

    letters.forEach(letter => {
      if(!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })
    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
      currentNode.value = data;
    }
    console.log(currentNode.value);
  }

  count() {
      return this.wordCount
  }

  suggest(word) {
    let wordsArray = [...word];
    let suggestionArray = [];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    const traverseTheTrie = (word, currentNode) => {
      let keys = Object.keys(currentNode.children);

      for (let j = 0; j < keys.length; j++) {
        console.log('CurrentNode', currentNode, 'Keys', keys);
        const child = currentNode.children[keys[j]];
        let newString = word + child.letter;
        if(child.isWord) {
          suggestionArray.push(newString);
        }
        traverseTheTrie(newString, child);
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestionArray.push(word)
    }

    if(currentNode) {
      traverseTheTrie(word, currentNode)
    }

    return suggestionArray;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
};
