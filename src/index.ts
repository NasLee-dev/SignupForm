import App from "./app";
import { AnyObject } from "./types";

declare namespace global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: AnyObject) => string;
    },
    daum: any
  }
}

const app = new App('#root', {
  title: 'JavaScript & TypeScript Form'
})

app.render()
