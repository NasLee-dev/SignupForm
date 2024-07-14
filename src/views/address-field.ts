import template from './address-field.template';
import { DaumAddress } from '../types';

declare global {
  interface Window {
    Handlebars: {
      compile: (template: string) => (data: any) => string;
    },
    daum: any
  }
}

type Props = {
  id: string;
  label: string;
  require?: boolean;
}

const DefaultProps: Props = {
  id: '',
  label: 'label',
  require: false,
};

export default class AddressField {
  private template = template;
  private container: string;
  private data: Props;

  private address1?: string;
  private zipcode?: string;

  constructor(container: string, data: Props) {
    this.container = container;
    this.data = { ...DefaultProps, ...data };
  }

  public get isValid(): boolean {
    return true;
  }

  public get name(): string {
    return this.data.id;
  }

  public get value(): string {
    const container = document.querySelector(this.container) as HTMLElement;
    const address2 = (container.querySelector('#address2') as HTMLInputElement)?.value;

    return `${this.zipcode}|${this.address1} ${address2 || ''}`;
  }

  public render = (append: boolean = false) => {
    const container = document.querySelector(this.container) as HTMLElement;

    if (append) {
      const divFragment = document.createElement('div');

      divFragment.innerHTML = this.template({ 
        ...this.data, 
        });

      container.appendChild(divFragment.firstElementChild as HTMLElement);
    } else {
      container.innerHTML = this.template({ 
        ...this.data, 
        });
    }

    container.querySelector(`#search-address`)?.addEventListener('click', () => {
      new window.daum.Postcode({
        oncomplete: (data: DaumAddress) => {
          this.address1 = data.roadAddress;          
          this.zipcode = data.sigunguCode;
          
          (container.querySelector('#address1') as HTMLInputElement).value = `(${this.zipcode}) ${this.address1}`;
        }
      }).open();  
    });
  }
}
