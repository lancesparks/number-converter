import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Conversion } from "../interfaces/conversion.interface";

@Injectable({
  providedIn: "root",
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
    const lastDigit = numToConvert.split("").splice(-1)[0];

    if (this.conversionTypes.hasOwnProperty(lastDigit)) {
      const num = numToConvert
        .split("")
        .splice(0, numToConvert.length - 1)
        .join("");

      this.conversionResult$.next(
        parseFloat(num) * this.conversionTypes[lastDigit as keyof Conversion]
      );
    }

    if (!this.conversionTypes.hasOwnProperty(lastDigit)) {
      this.conversionResult$.next(parseFloat(numToConvert));
    }
  }
}
