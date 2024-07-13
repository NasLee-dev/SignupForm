declare namespace global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: any) => string;
    },
    daum: any
  }
}

const app = new App('#root', {
  title: 'JavaScript & TypeScript Form'
})

app.render()
