import { expect } from 'chai';
import Trie from "../lib/trie";
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () => {
  let completion;

  beforeEach(() => {
    completion = new Trie();
  });

  it('should start with zero elements', () => {
    expect(completion.wordCount).to.eq(0);
  });

  it('should instantiate Trie', () => {
    expect(completion).to.exist;
  });

  it('should track the number of words', () => {
    expect(completion.wordCount).to.equal(0);
  });

  it('should store child nodes', () => {
    expect(completion.children).to.deep.equal({});
  });

  describe('Insert', () => {
    it('should increment number of words', () => {
      completion.insert('pizza');
      expect(completion.wordCount).to.equal(1);
    });

    it('should create keys in children object of the first letter', () => {
      completion.insert('tacocat');
      completion.insert('pizza');
      completion.insert('cat');

      expect(Object.keys(completion.children)).to.deep.equal(['t', 'p', 'c']);
    });

    it('should add the word', () => {
      completion.insert("pizza");
      completion.insert("pizzas");
      completion.insert("piano");
      completion.insert("dog");
      completion.insert("dogs");

      expect(completion.children['p']).to.exist;
      expect(completion.children['p'].children['i']).to.exist;
      expect(completion.children['p'].children['i'].children['z'].children['z'].children['a']).to.exist;
      expect(completion.children['p'].children['i'].children['z'].children['z'].children['a'].isWord).to.be.true;

      expect(completion.children['d']).to.exist;
      expect(completion.children['d'].children['o']).to.exist;
      expect(completion.children['d'].children['o'].children['g'].isWord).to.be.true;

      // console.log(JSON.stringify(completion, null, 4))

    });

  });

  describe('SUGGEST', () => {

    beforeEach(() => {
      completion.insert('piano');
      completion.insert('pizza');
      completion.insert('pizzas');
      completion.insert('dog');
    });

    it('should return an array of suggested words', () => {
      // console.log(JSON.stringify(completion, null, 4));

      let results = completion.suggest('pi');

      let check1 = results.some(result => result === 'pizza');
      let check2 = results.some(result => result === 'pizzas');
      let check3 = results.some(result => result === 'piano');
      let check4 = results.some(result => result === 'dog');

      expect(check1).to.be.true;
      expect(check2).to.be.true;
      expect(check3).to.be.true;
      expect(check4).to.be.false;
    });

    //  it('should have a method, suggest', () => {
    //   expect(completion.suggest('dog')).to.be.a.function;
    // })

  });

  describe('Populate', () => {
    it('should populate trie with all the words', () => {

      completion.populate(dictionary);

      expect(completion.wordCount).to.equal(235886);
    });
  });

  describe('select', () => {
    it('should prioritize ', () => {
      completion.populate(dictionary);
      expect(completion.suggest('piz')).to.deep.equal([ 'pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ]);
      completion.select('pizzeria');
      expect(completion.suggest('piz')).to.deep.equal([ 'pizzeria', 'pize', 'pizza', 'pizzicato', 'pizzle' ]);
    });
  });
  
  describe('delete', () => {
    it('should delete the word ', () => {
      completion.populate(dictionary);
      expect(completion.suggest('piz')).to.deep.equal([ 'pize', 'pizza', 'pizzeria', 'pizzicato', 'pizzle' ]);
      
      completion.delete('pizzeria');
      expect(completion.suggest('piz')).to.deep.equal([ 'pize', 'pizza', 'pizzicato', 'pizzle' ]);
    });
  });

});
