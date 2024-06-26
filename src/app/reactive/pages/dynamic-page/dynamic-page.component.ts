import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required],
    ])
  });

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor( private fb: FormBuilder ) {}

  get favoritesGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  // Comprueba si tiene errores y se ha tocado el campo del form
  isValidField( field: string ):boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  // Comprueba si tiene errores y se ha tocado el campo del form
  // en un array
  isValidFieldInArray( formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched;
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

  // Añado al array de favorites
  onAddToFavorites():void {
    if ( this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;
    this.favoritesGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

  // Eliminar un elemento del array form
  onDeleteFavorite( index:number):void {
    this.favoritesGames.removeAt(index);
  }

  // Método final del form
  onSubmint():void {

    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray ) = this.fb.array([]);
    this.myForm.reset();
  }

}
