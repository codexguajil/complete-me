export default class Node {
  constructor (data) {
    this.next = null;
    this.data = data;
    this.children = {};
    this.isWord = false;
    this.popularity = 0;
  }
}