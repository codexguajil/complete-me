import Node from '../lib/node';

export default class Trie {
  constructor () {
    this.wordCount = 0;
    this.children = {};
    this.suggestions = [];
  }

 insert (word) {
  this.addWordToTrie(this, word);
 }

 addWordToTrie(node, word) {
  const letters =  [...word];

  while(letters.length) {
    let letter = letters.shift()

    if(!node.children[letter]) {
      node.children[letter] = new Node(letter);
    }
    if(!letters.length) {
      this.wordCount++;
      node.children[letter].isWord = true;
    }

    node = node.children[letter];
    
    }
  }

 suggest(prefix) {
  const suggestions = [];
  let currentNode = this.traverse(prefix);
  const addSuggestion = (node, prefix) => {
    if(node.isWord) {
      if(node.popularity === 0) {
        suggestions.push(prefix)
      } else {
        suggestions.unshift(prefix)
      }
    }
    const childNodes = Object.keys(node.children)
    childNodes.forEach((child) => {
      const newString = prefix + child;

      addSuggestion(node.children[child], newString)
    })
  }

  addSuggestion(currentNode, prefix);

  return suggestions;
}

traverse(prefix) {
  let rootNode = this;
  let currentNode = rootNode;
  let index = 0;
  let traversedNodes = 0;

  while(index < prefix.length) {
    if(currentNode.children[prefix[index]]) {
      currentNode = currentNode.children[prefix[index]];
      traversedNodes++;
    }
    index++
  }

  if (traversedNodes !== prefix.length) {
    return null;
  }

  return currentNode;
}

  populate (words) {
    words.forEach(word => {
      this.insert(word);
    });
  }

  select (string) {
    let currentNode = this.traverse(string);
    if (currentNode) {
      currentNode.popularity++;
    }
  }

  delete (string) {
    let currentNode = this.traverse(string);
    if(currentNode) {
      currentNode.isWord = false;
    }
  }
}