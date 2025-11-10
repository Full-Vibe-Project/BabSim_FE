export const updateSelection = (currentSelection: string[], clickedItem: string): string[] => {
  const isNoneClicked = clickedItem === '해당사항 없음';
  const isNoneSelected = currentSelection.includes('해당사항 없음');

  if (isNoneClicked) {
    return isNoneSelected ? [] : ['해당사항 없음'];
  }

  let newSelection = currentSelection.filter(item => item !== '해당사항 없음');

  if (newSelection.includes(clickedItem)) {
    newSelection = newSelection.filter(item => item !== clickedItem);
  } else {
    newSelection.push(clickedItem);
  }

  return newSelection;
};
