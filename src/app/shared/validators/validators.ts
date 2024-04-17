import { FormControl, ValidationErrors } from "@angular/forms";

export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";


// Comprueba si el valor q recibe === strider
// Si se cumple devuelve el mensaje de error
export const cantBeStrider = ( control: FormControl ): ValidationErrors | null => {

  const value:string = control.value.trim().toLowerCase();

  if( value === 'strider' ) {
    return {
      noStrider: true,
    }
  }

  return null;


}
