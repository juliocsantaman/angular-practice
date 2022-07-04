import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { samePasswords } from '../../validators/samePasswords';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.initForm();
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Registrado',
        text: 'Se ha enviado un correo electrónico para confirmar la cuenta.'
      }).then(()=> {
        this.signUpForm.reset();
      });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Ingresa la información de los campos.'
      });
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      rfc: ['', [Validators.required, Validators.minLength(13)]],
      curp: ['', [Validators.required, Validators.minLength(18)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      firstSurname: ['', [Validators.required, Validators.minLength(3)]],
      secondSurname: ['', [Validators.required, Validators.minLength(3)]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]

    }, {
      validators: samePasswords
    });
  }

  samePasswords(): any {
    return this.signUpForm.hasError('noSamePasswords') &&
      this.signUpForm.get('password')?.dirty &&
      this.signUpForm.get('confirmPassword')?.touched;
  }

}
