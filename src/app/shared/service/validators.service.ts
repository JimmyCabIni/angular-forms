import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { notEqual } from 'assert';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  // VALIDADOR ASÍNCRONO
  // Comprueba si el valor q recibe === strider
  // Si se cumple devuelve el mensaje de error
  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  // Comprueba si tiene errores y se ha tocado el campo del form
  public isValidField( form: FormGroup ,field: string ) {
    return form.controls[field].errors && form.controls[field].touched
  }

  // Comparo el valor de los dos passwords
  public isFieldOneEqualFieldTwo(field1: string, field2: string) {

    return ( formGroup: FormGroup ): ValidationErrors | null => {

        const fieldValue1 = formGroup.get(field1)?.value || '';
        const fieldValue2 = formGroup.get(field2)?.value || '';

        if( fieldValue1 !== fieldValue2 ){
          formGroup.get(field2)?.setErrors({ notEqual: true });
          return { notEqual: true }
        }

        formGroup.get(field2)?.setErrors(null)

        return null;
    }
  }

}
