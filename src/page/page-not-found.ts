import template from './page-not-found.template';

export default class PageNotFound {
  private template = template;
  private container: HTMLElement;

  constructor(container: HTMLElement | string) {
    if (typeof container === 'string') {
      const selectedContainer = document.querySelector(container);
      if (!selectedContainer) {
        throw new Error('Container element not found');
      }
      this.container = selectedContainer as HTMLElement;
    } else {
      this.container = container;
    }
  }
  render = () => {
    this.container.innerHTML = this.template({});
  }
}