import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Iniciando sesión'
      }).then(()=> {
        this.loginForm.reset();
      });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Ingresa la información correcta.'
      });
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+")]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

}
