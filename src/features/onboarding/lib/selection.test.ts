import { describe, it, expect } from 'vitest';
import { updateSelection } from './selection';

describe('updateSelection', () => {
  it('should add a new item to the selection', () => {
    const currentSelection = ['item1'];
    const clickedItem = 'item2';
    expect(updateSelection(currentSelection, clickedItem)).toEqual(['item1', 'item2']);
  });

  it('should remove an existing item from the selection', () => {
    const currentSelection = ['item1', 'item2'];
    const clickedItem = 'item1';
    expect(updateSelection(currentSelection, clickedItem)).toEqual(['item2']);
  });

  it('should select only "None" when "None" is clicked', () => {
    const currentSelection = ['item1', 'item2'];
    const clickedItem = '해당사항 없음';
    expect(updateSelection(currentSelection, clickedItem)).toEqual(['해당사항 없음']);
  });

  it('should deselect "None" when another item is clicked', () => {
    const currentSelection = ['해당사항 없음'];
    const clickedItem = 'item1';
    expect(updateSelection(currentSelection, clickedItem)).toEqual(['item1']);
  });

  it('should deselect "None" if it is already selected and another item is clicked', () => {
    const currentSelection = ['item1', '해당사항 없음'];
    const clickedItem = 'item2';
    expect(updateSelection(currentSelection, clickedItem)).toEqual(['item1', 'item2']);
  });

  it('should return just "None" if it is clicked when other items are selected', () => {
    const currentSelection = ['item1', 'item2'];
    const clickedItem = '해당사항 없음';
    expect(updateSelection(currentSelection, clickedItem)).toEqual(['해당사항 없음']);
  });
});
