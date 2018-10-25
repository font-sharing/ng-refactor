export const notEmpty = value => value !== '';
export const format = value => (/^\d{4}-\d{2}$/g).test(value);
export const positiveNumber = value => !(isNaN(parseInt(value, 10)) || value < 0);

export const empty_error = field => `${field} cannot be empty`;
export const format_error = field => `Invalid ${field} format`;
export const invalid_error = field => `Invalid ${field}`;

export const NOT_EMPTY = {validate: notEmpty, error: empty_error};
export const FORMAT = {validate: format, error: format_error};
export const POSITIVE_NUMBER = {validate: positiveNumber, error: invalid_error};

export default class {

  errors = {};

  constructor(private rules) {
  }

  validate(data: any) {
    for (const field in this.rules) {
      const find = this.rules[field].find(v => !v.validate(data[field])) || {error: () => ''};
      this.errors[field] = find.error(this.toUpperCase(field));
    }

    return this.errors;
  }

  get valid() {
    for (const key in Object.getOwnPropertyNames(this.errors)) {
      if (this.errors[key]) {
        return false;
      }
    }

    return true;
  }

  private toUpperCase(field) {
    return field.charAt(0).toUpperCase() + field.slice(1);
  }
}
