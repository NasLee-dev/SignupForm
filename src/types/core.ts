export interface CoreProps {
  id: string;
  text?: string;
  label: string;
  type: string;
  placeholder: string;
  require: boolean;
}

export interface RequireRule {
  rule: RegExp;
  match: boolean;
  message: string;
}
