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
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    })
    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
      currentNode.value = data;
    }
  }

  count() {
    return this.wordCount;
  }

  suggest(word) {
    let wordsArray = [...word.toLowerCase()];
    let suggestionArray = [];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    const findThatWord = (word, currentNode) => {
      let keys = Object.keys(currentNode.children);

      for (let j = 0; j < keys.length; j++) {
        const child = currentNode.children[keys[j]];
        let newString = word + child.letter;

        if (child.isWord) {
          suggestionArray.push({name: newString, frequency: child.frequency, lastTime: child.lastSelected});
        }
        findThatWord(newString, child);
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestionArray.push({name: word, frequency: currentNode.frequency, lastTime: currentNode.lastSelected})
    }

    if (currentNode) {
      findThatWord(word, currentNode)
    }
    // console.log(suggestionArray);
    suggestionArray.sort((a, b) => {
      return b.frequency - a.frequency || b.lastTime - a.lastTime;
    })
    return suggestionArray.map((obj) => {
      return obj.name
    })
  }

  select(word) {
    let wordsArray = [...word.toLowerCase()];
    let currentNode = this.root;

    for (let i = 0; i < wordsArray.length; i++) {
      currentNode = currentNode.children[wordsArray[i]]
    }
    currentNode.frequency++
    currentNode.lastSelected = Date.now();
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    })
  }
}
