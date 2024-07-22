import { ValidateRule } from "../types";
import { CoreProps } from "../types/core";

const DefaultProps: CoreProps = {
  id: '',
  text: '',
  label: 'label',
  type: 'text',
  placeholder: '',
  require: false,
};

export default abstract class CoreField {
  template;
  container;
  data;
  validateRules: ValidateRule[] = [];

  constructor(template: (data: CoreProps) => string, container: HTMLElement | string, data: CoreProps) {
    this.template = template;
    this.container = container;
    this.data = {...DefaultProps, ...data};
  }

  validate = () => {
    const target = this.data.text ? this.data.text.trim() : '';
    const invalidateRules = this.validateRules.filter((validateRule) => validateRule.rule.test(target) !== validateRule.match);

    return (invalidateRules.length >0) ? invalidateRules[0] : null;
  }

  addValidateRule = (rule: ValidateRule) => {
    this.validateRules.push(rule);
  }

  get name() {
    return this.data.id;
  }

  get value() {
    return this.data.text ?? '';
  }

  render = (append: boolean = false) => {
    let container: HTMLElement | null = null;
    if (typeof this.container === 'string') {
      container = document.querySelector(this.container);
    } else {
      container = this.container;
    }

    if (append && container) {
      const divFragment = document.createElement('div');
      divFragment.innerHTML = this.template(this.buildData());

      container?.appendChild(divFragment.children[0]);
    } else {
      if (container) {
        container.innerHTML = this.template(this.buildData());
      }
    }
  }
  abstract buildData(): CoreProps;
}