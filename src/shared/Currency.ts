export class Currency {
  private type: string;

  constructor(type = 'ARS') {
    this.type = type;
  }

  equals(that: Currency): boolean {
    return this.type === that.type;
  }

  toString(): string {
    return this.type;
  }
  static create(type?: string): Currency {
    return new Currency(type);
  }
}
