import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
    name: 'RTX 5090' ,
    price: 2500,
    inStorage: 6
}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit {

  // Otra opción
  // public myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  // Creación del formulario
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3) ] ],
    price: [0, [ Validators.required, Validators.min(0)]],
    inStorage: [0, [ Validators.required, Validators.min(0) ]],
  })

  constructor( private fb: FormBuilder ){}

  ngOnInit(): void {
    //this.myForm.reset( rtx5090 )
  }

  // Comprueba si tiene errores y se ha tocado el campo del form
  isValidField( field: string ):boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  // Muestra el error que tiene
  getFieldError(field:string): string | null {

    if ( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ) {
        case 'required':
          return 'Este campo es obligatorio';

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`
      }
    }

    return null;
  }

  // Lo llama el form
  onSave():void {

    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    this.myForm.reset({ price:0, inStorage: 0 })
  }


}
