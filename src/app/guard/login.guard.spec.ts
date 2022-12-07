import { TestBed } from "@angular/core/testing";

import { LoginGuard } from "./login.guard";
import { AuthService } from "../services/auth/auth.service";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LoginGuard", () => {
  let guard: LoginGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    });
    guard = TestBed.inject(LoginGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  it("should allow access if the user is not authenticated", () => {
    spyOn(authService, "isAuthenticated").and.returnValue(false);
    const spy = spyOn(router, "navigate");
    const activatedRouteSnapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(
      guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
    ).toBeTruthy();
    expect(spy).not.toHaveBeenCalled();
  });

  it("should not allow access if the user is authenticated", () => {
    spyOn(authService, "isAuthenticated").and.returnValue(true);
    const spy = spyOn(router, "navigate");
    const activatedRouteSnapshot: ActivatedRouteSnapshot =
      {} as ActivatedRouteSnapshot;
    const routerStateSnapshot: RouterStateSnapshot = {} as RouterStateSnapshot;

    expect(
      guard.canActivate(activatedRouteSnapshot, routerStateSnapshot)
    ).toBeFalsy();
    expect(spy).toHaveBeenCalledWith(["/"]);
  });
});
