import { RequireRule } from "../constant";
import { CoreProps } from "../types/core";
import { nextTick } from "../utils";
import CoreField from "./core";
import template from "./login.text-field.template";

export default class TextField extends CoreField {
  private updated = false;

  constructor(container: HTMLElement | string, data: CoreProps) {
    super(template, container, data);

    if (this.data.require) {
      this.addValidateRule(RequireRule);
    }
    nextTick(this.#attachEventHandler);
  }

  public buildData = () => {
    const isInvalid = this.validate();

    if (this.updated) {
      return {
        ...this.data,
        updated: this.updated,
        valid: !isInvalid,
        validateMessage: !!isInvalid ? isInvalid.message : '',
      }
    } else {
      return {
        ...this.data,
        updated: this.updated,
        valid: true,
        validateMessage: '',
      }
    }
  }

  private onChange = (e: Event) => {
    const { value, id } = e.target as HTMLInputElement;

    if (id === this.data.id) {
      this.updated = true;
      this.data.text = value;
    }
  }

  #attachEventHandler = () => {
    if (typeof this.container === 'string') {
      document.querySelector(this.container)?.addEventListener('change', this.onChange);
    } else {
      this.container.addEventListener('change', this.onChange);
    }
  }
  get isValid() {
    return !this.validate();
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
}