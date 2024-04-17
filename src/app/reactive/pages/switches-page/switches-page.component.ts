import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: [ 'M', Validators.required ],
    wantNotification: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  public person = {
    gender: 'F',
    wantNotification: false,
  }

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {
    this.myForm.reset( this.person )
  }

  // Comprueba si tiene errores y se ha tocado el campo del form
  isValidField( field: string ):boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  getFieldError(field:string): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es obligatorio';

        case 'requiredTrue':
          return 'Debe de aceptar las condiciones de uso'
      }
    }

    return null;
  }


  //ngSubmit
  onSave() {

    if( this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value)
    console.log(this.person)
  }
}
