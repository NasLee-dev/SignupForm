import template from './profile.template';

export default class Profile {
  private template = template;
  private data: any;
  private container: HTMLElement;

  constructor(container: HTMLElement | string, data: any) {
    if (typeof container === 'string') {
      const selectedContainer = document.querySelector(container);
      if (!selectedContainer) {
        throw new Error('Container element not found');
      }
      this.container = selectedContainer as HTMLElement;
    } else {
      this.container = container;
    }
    this.data = data;
    this.initialize();
  }

  private initialize() {
    if (!this.data.store.userProfile) {
      location.href = '/';
    }
  }

  render = () => {
    this.container.innerHTML = this.template({
      userProfile: this.data.store.userProfile,
      posts: this.data.store.userPosts
    })
  }
}