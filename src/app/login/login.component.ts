import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators as V,
} from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";
import { AuthBodyInterface } from "../response-interfaces/AuthBody.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  errorFlag = false;
  form!: FormGroup;
  registerForm = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [V.required, V.email]],
      password: ["", V.required],
    });
  }

  get email(): AbstractControl {
    return this.form.get("email")!;
  }

  get password(): AbstractControl {
    return this.form.get("password")!;
  }

  toggleRegister() {
    this.registerForm = !this.registerForm;
    this.errorFlag = false;
    this.email.setValue("");
    this.password.setValue("");
  }

  handleLogin() {
    this.authService.login(this.extractBody()).subscribe({
      next: (response) => {
        if (response) {
          this.redirectToHome();
        }
      },
      error: () => {
        this.setError();
      },
    });
  }

  handleRegister() {
    this.authService.register(this.extractBody()).subscribe({
      next: (response) => {
        if (response) {
          this.redirectToHome();
        }
      },
      error: () => {
        this.setError();
      },
    });
  }

  onSubmit() {
    if (this.registerForm) {
      this.handleRegister();
      return;
    }

    this.handleLogin();
  }

  setError() {
    this.errorFlag = true;
  }

  redirectToHome() {
    this.router.navigate(["/"]);
  }

  private extractBody(): AuthBodyInterface {
    return {
      email: this.email.value,
      password: this.password.value,
    };
  }
}
