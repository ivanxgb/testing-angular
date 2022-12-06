import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators as V} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup
  showRegisterForm: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [V.required, V.email]],
      password: ['', [V.required, V.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      email: ['', [V.required, V.email]],
      password: ['', V.required],
      confirmPassword: ['', [V.required, V.minLength(6)]]
    });
  }


  onSubmit() {
    console.log(this.loginForm.value);
  }

  toggleRegister() {
    this.showRegisterForm = !this.showRegisterForm;
  }
}
