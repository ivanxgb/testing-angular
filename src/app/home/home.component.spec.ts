import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check if user is authenticated on init and show logout button", () => {
    spyOn(authService, "isAuthenticated").and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isAuthenticated).toBeTrue();
    const el = fixture.nativeElement.querySelector("button");
    expect(el.textContent).toContain("Logout");
  });

  it("should check if user is authenticated on init and show login button", () => {
    spyOn(authService, "isAuthenticated").and.returnValue(false);
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.isAuthenticated).toBeFalsy();
    const el = fixture.nativeElement.querySelector("button");
    expect(el.textContent).toContain("Login");
  });

  it("should navigate to the login page when the login button is clicked", () => {
    spyOn(component, "onLogin").and.callThrough();
    spyOn(router, "navigate");
    const el = fixture.nativeElement.querySelector("button");
    el.click();
    expect(component.onLogin).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["/login"]);
  });

  it("should logout the user when the logout button is clicked", () => {
    component.isAuthenticated = true;
    fixture.detectChanges();
    spyOn(component, "onLogout").and.callThrough();
    spyOn(authService, "logout");
    const el = fixture.nativeElement.querySelector("button");
    el.click();
    expect(component.onLogout).toHaveBeenCalled();
    expect(authService.logout).toHaveBeenCalled();
    expect(component.isAuthenticated).toBeFalsy();
  });
});
