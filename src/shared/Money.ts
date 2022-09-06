import { CurrenciesDontMatch } from '../error/currencyDonMatch.js';
import { Currency } from './Currency.js';

export class Money {
  private cents = 0;
  private currency: Currency;

  private constructor(amount: number, currency: Currency) {
    this.cents = amount;
    this.currency = currency;
  }

  static fromString(amount: string, currency: Currency) {
    return new Money(Number(amount) * 100, currency);
  }

  static fromCents(cents: number, currency: Currency) {
    return new Money(cents, currency);
  }

  add(money: Money) {
    if (!this.currency.equals(money.currency)) {
      throw new CurrenciesDontMatch(
        this.currency.toString(),
        money.currency.toString()
      );
    }
    return new Money(this.cents + money.cents, this.currency);
  }

  reducedByPercent(percent: number) {
    let reduction = this.cents * (percent / 100);
    let difference = this.cents - reduction;
    let rounded = Math.round(difference);
    return Money.fromCents(rounded, this.currency);
  }
}
