export default class {
  constructor() {
    this.lastId = 0;
    this.elements = {};
  }

  resetElement = (id, element) => {
    const defaultElement = this.elements[id];

    element.setAttribute('style', defaultElement.style);

    defaultElement.isBeingHighlighted = false;
  };

  highlightElement = (
    element,
    properties = { color: '#ffc107', background: '#8d8d9e' }
  ) => {
    const id = `${element.id}-${this.lastId++}`;

    let defaultElement = this.elements[id];

    if (!defaultElement) {
      if (!element.classList.contains('instructionFocusable')) {
        element.classList.add('instructionFocusable');
      }

      this.elements[id] = {
        style: element.getAttribute('style') || '',
        isBeingHighlighted: false,
      };

      defaultElement = this.elements[id];
    } else if (defaultElement.isBeingHighlighted) return;

    let styles = '';

    for (const property in properties) {
      styles += `${property}: ${properties[property]} !important; `;
    }

    const elementStyles = element.getAttribute('style');
    element.setAttribute('style', `${elementStyles || ''} ${styles}`);

    defaultElement.isBeingHighlighted = true;

    setTimeout(() => {
      this.resetElement(id, element);
    }, 500);
  };
}
