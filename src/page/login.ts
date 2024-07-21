import { CoreProps } from '../types/core';
import TextField from '../views/login.text-field';
import template from './login.template';
import axios from 'axios';

export default class Login {
  #template = template;
  #data;
  #container: HTMLElement;
  #loginFail = false;
  #fields: TextField[] = [];

  constructor(container: HTMLElement | string, data: any) {
    if (typeof container === 'string') {
      const selectedContainer = document.querySelector(container);
      if (!selectedContainer) {
        throw new Error('Container element not found');
      }
      this.#container = selectedContainer as HTMLElement;
    } else {
      this.#container = container;
    }
    this.#data = data;

    this.#initialize();
  }

  #initialize = () => {
    const idField = new TextField('#login-fields', {
      id: 'userId',
      label: '아이디',
      type: 'text',
      placeholder: '아이디를 입력해주세요',
      require: true,
    });
    const passwordField = new TextField('#login-fields', {
      id: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력해주세요',
      require: true,
    });
    this.#fields.push(idField);
    this.#fields.push(passwordField);
  }
  #onSubmit = (e: Event) => {
    e.preventDefault();
    const loginData = this.#fields.map((field) => ({ [field.name]: field.value })).reduce((a, b) => ({ ...a, ...b }), {});
    axios.post('/api/authentication', loginData).then(result => {
      return result.data.result;
    })
    .then(({ id, token }) => {
      const options = {
        headers: token
      };
      this.#data.store.token = token;

      return axios.all([
        axios.get(`/api/user/${id}`, options),
        axios.get(`/api/user/${id}/posts`, options),
      ])
    })
    .then(([profile, posts]) => {
      this.#data.store.userProfile = profile.data.result;
      this.#data.store.posts = posts.data.result;

      location.href = '/#/profile';
    })
    .catch((error: Error)=> {
      this.#loginFail = true;
      this.render();
    })
  }
  render = () => {
    this.#container.innerHTML = this.#template({ ...this.#data, loginFail: this.#loginFail });
    this.#fields.forEach(field => {
      field.render(true);
    });

    this.#container.addEventListener('submit', this.#onSubmit);
  }
}