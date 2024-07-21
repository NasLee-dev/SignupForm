import template from "./signup.template";
import { CantContainWhitespace, CantStartNumber, MinimumLengthLimit } from "../constant";
import { AnyObject } from "../types";
import { AddressField, PasswordField, TextField } from "../views";

export default class Signup {
  template = template
  data: AnyObject;
  container: HTMLElement | string;
  fields: AnyObject[];
  active: boolean = false;

  constructor(container: HTMLElement | string, data: any = {}) {
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
    this.fields = [];
    this.initialize();

    setInterval(this.validFieldMonitor, 1000/30);
  }

  private initialize = () => {
    const nameField = new TextField('#required-fields', {
      id: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름을 입력해주세요',
      require: true,
    });
    const idField = new TextField('#required-fields', { 
      id: 'id', label: '아이디', type: 'text', placeholder: '아이디를 입력해주세요', require: true,
    });

    const emailField = new TextField('#required-fields', { 
      id: 'email', label: '이메일', type: "email", placeholder: '이메일을 입력해주세요', require: true,
    });
    
    const passwordField = new PasswordField('#required-fields', { 
      id: 'password', label: '비밀번호', placeholder: '비밀번호를 입력해주세요', 
    });

    const addressField = new AddressField('#optional-fields', {
      id: 'address', label: '배송지 주소',
    });
    idField.addValidateRule(CantContainWhitespace);
    idField.addValidateRule(CantStartNumber);
    idField.addValidateRule(MinimumLengthLimit(3));

    emailField.addValidateRule(CantContainWhitespace);

    this.fields.push(nameField);
    this.fields.push(idField);
    this.fields.push(emailField);
    this.fields.push(passwordField);
    this.fields.push(addressField);
  }

  private validFieldMonitor = () => {
    let btnJoin: HTMLElement | null = null
    if (typeof this.container === 'string') {
      btnJoin = document.querySelector('#btn-join');
    } else {
      btnJoin = this.container.querySelector('#btn-join');
    }

    if (this.fields.filter(field => field.isValid).length === this.fields.length) {
      this.active = true
      if (!btnJoin) return
      btnJoin.classList.remove('bg-gray-300')
      btnJoin.classList.add('bg-green=500')
    } else {
      this.active = false
      if (!btnJoin) return
      btnJoin.classList.remove('bg-green-500')
      btnJoin.classList.add('bg-gray-300')
    }
  }

  private onSubmit = (e: Event) => {
    e.preventDefault()
    if (!this.active) return

    const submitData: AnyObject = this.fields.map(field => ({
      [field.name]: field.value
    })).reduce((a, b) => ({ ...a, ...b }), {})
  }

  public render = () => {
    if (typeof this.container === 'string') {
      const selectedContainer = document.querySelector(this.container);
      if (!selectedContainer) {
        throw new Error('Container element not found');
      }
      this.container = selectedContainer as HTMLElement;
    }
    this.container.innerHTML = this.template(this.data)
    this.fields.forEach(field => {
      field.render(true)
    })
    this.container.addEventListener('submit', this.onSubmit)
  }
}