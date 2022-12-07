import { ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from "@angular/platform-browser/animations";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should extract the body from the form and pass to login", () => {
    const email = "email@email.com";
    const password = "password";
    component.email.setValue(email);
    component.password.setValue(password);

    spyOn(authService, "login").and.returnValue(of(true));
    spyOn(router, "navigate");

    component.handleLogin();
    expect(authService.login).toHaveBeenCalledWith({
      email,
      password,
    });

    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  });

  it("should extract the body from the form and pass to register", () => {
    const email = "email@email.com";
    const password = "password";
    component.email.setValue(email);
    component.password.setValue(password);

    spyOn(authService, "register").and.returnValue(of(true));
    spyOn(router, "navigate");

    component.handleRegister();
    expect(authService.register).toHaveBeenCalledWith({
      email,
      password,
    });

    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  });

  it("should set the error flag to true", () => {
    spyOn(authService, "login").and.returnValue(of(false));
    spyOn(router, "navigate");
    component.setError();
    expect(component.errorFlag).toBeTrue();
  });

  it("should redirect to home", () => {
    spyOn(authService, "login").and.returnValue(of(true));
    spyOn(router, "navigate");
    component.redirectToHome();
    expect(router.navigate).toHaveBeenCalledWith(["/"]);
  });

  it("should toggle the register form", () => {
    component.toggleRegister();
    expect(component.registerForm).toBeTrue();
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector("button:last-of-type");
    expect(element.textContent).toContain("Register");

    component.toggleRegister();
    fixture.detectChanges();
    expect(component.registerForm).toBeFalse();
    expect(element.textContent).toContain("Login");
  });

  it("should set the error flag to true and display mat-error", () => {
    spyOn(authService, "login").and.returnValue(of(false));
    spyOn(router, "navigate");
    component.setError();
    expect(component.errorFlag).toBeTrue();
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector("mat-error");
    expect(element.textContent).toContain("It was an error");
  });

  it("should call the handleLogin onSubmit", () => {
    spyOn(component, "handleLogin");

    component.email.setValue("email@email.com");
    component.password.setValue("password");
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector("button");
    submitButton.click();
    expect(component.handleLogin).toHaveBeenCalled();
  });

  it("should call the handleRegister onSubmit", () => {
    spyOn(component, "handleRegister");

    component.email.setValue("email@email.com");
    component.password.setValue("password");
    component.registerForm = true;
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector("button");
    submitButton.click();
    expect(component.handleRegister).toHaveBeenCalled();
  });
});
