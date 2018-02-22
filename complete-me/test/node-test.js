import { expect } from 'chai';
import Node from '../lib/node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza');
  });

  it('should be a thing', () => {
    expect(node).to.exist;
  });

  it('should default next to null', () => {
    expect(node.next).to.equal(null);
  });

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza');

    let newNode = new Node('pineapple');
    expect(newNode.data).to.equal('pineapple');
  });

});