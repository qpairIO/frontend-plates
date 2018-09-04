import { Injectable } from '@angular/core';

@Injectable()
export default class StatsService {

  constructor() { }

  combination(high, low) {
    return (this.factorial(high) / (this.factorial(low) * this.factorial(high - low)));
  }
  power(base, exponent) {
    return Math.pow(base, exponent);
  }
  root(number, nRoot) {
    return Math.pow(number, 1 / nRoot);
  }

  absolute(number) {
    return Math.abs(number);
  }

  factorial(n) {
    let f: Array<any> = [];
    if (n === 0 || n === 1) {
      return 1;
    } else {
      f[1] = 1;
      for (var i = 2; i <= n; i++) {
        f[i] = f[i - 1] * i;
      }
    }
    return f[n];
  }

  round(floatValue, decimals) {
    return (Math.round(floatValue * Math.pow(10, decimals)) / Math.pow(10, decimals));
  }
}
