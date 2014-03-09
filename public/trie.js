Trie = function(){
  this.characters = {};
};



Trie.prototype.learn = function(word, index){

  index = index || 0;
  var char = word[index];
  if (this.characters[char]) {
    this.characters[char].learn(word, index + 1);
  } else {
    if  (index === word.length) {
      // assigning true to the property isWord of the last letter
      this.isWord = true;
    } else { 
    this.characters[char] = new Trie(); // assignment 
                                                    // passing in the entire word and the index
    this.characters[char].learn(word, index + 1); // retriving the value by calling learn on it and 
    }
  }
// This function should add the given word,  
  // starting from the given index,
  // to this Trie.

  // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
  words = words || [];
  currentWord = currentWord || "";

  if (this.isWord) {
    words.push(currentWord);
  }

  for (var char in this.characters) {
    var newWord = currentWord + char;
    if (this.characters[char].characters) {
      this.characters[char].getWords(words, newWord);
    }
  }
  return words;
};

Trie.prototype.find = function(word, index){
 
  word = word || "";
  index = index || 0;
  var node = word[index];
  

  if(this.characters[node]) {
    return this.characters[node].find(word, index + 1);
  } else if (index === word.length){
    return this;
  } else {
    return false;
  }
 
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.

  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){

  var find_result = this.find(prefix);

  if(find_result){
    return find_result.getWords([], prefix);
  } else { 
    return [];
  }

  // This function will return all completions 
  // for a given prefix.
  // It should use find and getWords.
};








