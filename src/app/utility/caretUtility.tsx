export const getCaretPosition = (element: HTMLElement) => {
  let caretOffset = 0;
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }
  return caretOffset;
};

export const setCaretPosition = (element: HTMLElement, offset: number) => {
  const range = document.createRange();
  const selection = window.getSelection();
  let currentOffset = 0;

  function traverseNodes(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const textLength = node.nodeValue ? node.nodeValue.length : 0;
      if (currentOffset + textLength >= offset) {
        range.setStart(node, offset - currentOffset);
        range.setEnd(node, offset - currentOffset);
        return true;
      }
      currentOffset += textLength;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (traverseNodes(node.childNodes[i])) {
          return true;
        }
      }
    }
    return false;
  }

  traverseNodes(element);
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};
