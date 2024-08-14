import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function InputValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValidInput = new RegExp(/^\.?\d*\.?\d*([kmbKMB])?$/);

    return !isValidInput.test(control.value)
      ? {
          invalidFormat: true,
        }
      : null;
  };
}
