export const updateSelection = (currentSelection: string[], clickedItem: string): string[] => {
  const isNoneClicked = clickedItem === '해당사항 없음';
  const isNoneSelected = currentSelection.includes('해당사항 없음');

  if (isNoneClicked) {
    return ['해당사항 없음'];
  }

  const newSelection = currentSelection.filter(item => item !== '해당사항 없음');

  if (newSelection.includes(clickedItem)) {
    return newSelection.filter(item => item !== clickedItem);
  } else {
    return [...newSelection, clickedItem];
  }
};