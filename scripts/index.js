import Trie from './Trie';
import words from './words';

const trie = new Trie();

trie.populate(words);

let string = $('#search-bar');

function readyToSuggest() {
  let listArray = $('.wordButton');

  listArray.remove()
  let findThis = string.val().toLowerCase();
  let displayWords = trie.suggest(findThis);

  for (let i = 0; i < 10 && displayWords.length; i++) {
    if (displayWords[i] !== undefined) {
      $('#did-you-mean').append(`<button class='wordButton'>${displayWords[i]}</button>`)
    }
  }
}


function selected(event) {
  let buttonWord = event.target.innerHTML;

  trie.select(buttonWord);
  readyToSuggest();
}

$('#search-bar').on('input', readyToSuggest);

$('#did-you-mean').on('click', '.wordButton', selected)
