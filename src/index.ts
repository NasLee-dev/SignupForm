import Login from "./page/login";
import Signup from "./page/signup";
import Store from "./store";
import { AnyObject } from "./types";

declare namespace global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
    },
    daum: any
  }
}

const store = new Store();

function router() {
  const path = location.hash;
  switch(path) {
    case '':
    case '#/login':
      const login = new Login('#root', {
        store,
        title: 'JavaScript & TypeScript Login',
      });
      login.render();
      break;
    case '#/profile':
      break;
    case '#/post':
      break;
    case '#/signup':
      const signup = new Signup('#root', {
        title: 'JavaScript & TypeScript Form'
      })
      signup.render()
  }
}

window.addEventListener('hashchange', router);
document.addEventListener('DOMContentLoaded', router);
