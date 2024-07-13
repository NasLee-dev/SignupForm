import template from "./app.template";

export default class App {
  template = template
  data: any;
  container: HTMLElement;
  fields: any;
  active: boolean = false;

  constructor(container: string, data: any = {}) {
    this.container = document.querySelector(container) as HTMLElement;
    this.data = data;
    this.fields = [];
    this.initialize();

    setInterval(this.valiFieldMonitor, 1000/30);
  }

  private initialize = () => {
    const nameField = new TextField('#required-fields', {
      id: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력해주세요',
      required: true,
    })
  }
}