import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Conversion } from '../interface/conversion.interface';

@Injectable({
  providedIn: 'root',
})
export class ConversionService {
  public conversionTypes = {
    k: 1000,
    m: 1000000,
    b: 1000000000,
  };
  public conversionResult$: BehaviorSubject<number | null> =
    new BehaviorSubject(null);
  constructor() {}

  createConversion(numToConvert: string): void {
    // let conversion = numToConvert.split('').splice(-1);
    const lastDigit = numToConvert.split('').splice(-1)[0];

    if (this.conversionTypes.hasOwnProperty(lastDigit)) {
      const num = numToConvert
        .split('')
        .splice(0, numToConvert.length - 1)
        .join('');

      this.conversionResult$.next(
        parseFloat(num) * this.conversionTypes[lastDigit as keyof Conversion]
      );
    }

    if (!this.conversionTypes.hasOwnProperty(lastDigit)) {
      this.conversionResult$.next(parseFloat(numToConvert));
    }

    // this.conversionTypes.hasOwnProperty(
    //   numToConvert.split('').splice(-1)[0]
    // );
    // console.log(lastDigit);
    // let numBuilder: string = '';
    // let conversion: number;

    // for (let i = 0; i < numToConvert.length; i++) {
    //   if (i === numToConvert.length - 1) {
    //     //keep track of i to see if its a letter then get its corresponding value
    //     if (this.conversionTypes.hasOwnProperty(numToConvert[i])) {
    //       conversion =
    //         this.conversionTypes[numToConvert[i] as keyof Conversion] *
    //         parseInt(numBuilder);

    //       this.conversionResult$.next(conversion);
    //     } else {
    //       //if last char isn't a letter just use that number to display result
    //       numBuilder += numToConvert[i];
    //       this.conversionResult$.next(parseInt(numBuilder));
    //     }
    //   }
    //   numBuilder += numToConvert[i];
    // }
  }
}
