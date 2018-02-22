insert (word) {

  const addWordToTrie = (node, word) => {
    const firstLetter = word[0];

    if(!node.children[firstLetter]) {
      node.children[firstLetter] = new Node(firstLetter)
    }
    if(word.length === 1) {
    this.wordCount++;
    node.children[firstLetter].isWord = true;
  }
   if(word.length > 1) {
    addWordToTrie(node.children[firstLetter], word.slice(1))
   }
}

addWordToTrie(this, word);
}

---------------

 insert(string) {
    let currentNode = this.root;
    let stringArray = [...string];

    this.wordCount++;

    for (var i = 0; i < stringArray.length; i++) {
      let data = stringArray[i];
      let child = new Node(data);

      if (!currentNode.children[data]) {
        currentNode.children[data] = child;
        currentNode = currentNode.children[data];
      } else {
        currentNode = currentNode.children[data];
      }
    }
    currentNode.isWord = true;
  }

  ----------------

suggest(prefix) {
  const suggestions = [];
  let rootNode = this
  let index = 0;
  let currentNode = rootNode

  while(index < prefix.length) {
    if(currentNode.children[prefix[index]]) {
      currentNode = currentNode.children[prefix[index]]
    }
    index++
  }

  const addSuggestion = (node, prefix) {
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
