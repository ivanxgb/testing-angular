import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators as V} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {AuthBodyInterface} from "../response-interfaces/AuthBody.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  registerForm: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [V.required, V.email]],
      password: ['', V.required],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  toggleRegister() {
    this.registerForm = !this.registerForm;
  }

  handleLogin() {
    this.authService.login(this.extractBody()).subscribe(
      {
        next: (response) => {
          console.log(response);
        }
      }
    );
  }

  handleRegister() {
    this.authService.register(this.extractBody()).subscribe(
      {
        next: (response) => {
          console.log(response);
        }
      }
    );
  }

  onSubmit() {
    if (this.registerForm) {
      this.handleRegister();
      return;
    }

    this.handleLogin();
  }

  private extractBody(): AuthBodyInterface {
    return {
      email: this.email.value,
      password: this.password.value
    }
  }
}
