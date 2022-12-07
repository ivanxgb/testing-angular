import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { environment } from "../../../environments/env";

describe("AuthService", () => {
  let service: AuthService;
  let http: HttpTestingController;

  const mockBody = {
    email: "email@email.com",
    password: "password",
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should login save token on success and return true ", () => {
    service.login(mockBody).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne(`${environment.urlApi}login`);
    expect(req.request.method).toBe("POST");
    req.flush({ token: "token-response" });

    expect(service.getToken()).toBe("token-response");
  });

  it("should login return false on error", () => {
    service.login(mockBody).subscribe((response) => {
      expect(response).toBeFalsy();
    });

    const req = http.expectOne(`${environment.urlApi}login`);
    expect(req.request.method).toBe("POST");
    req.flush({ error: "error" });

    expect(service.getToken()).toBeNull();
  });

  it("should register save token on success and return true ", () => {
    service.register(mockBody).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = http.expectOne(`${environment.urlApi}register`);
    expect(req.request.method).toBe("POST");
    req.flush({ token: "token-response" });

    expect(service.getToken()).toBe("token-response");
  });

  it("should register return false on error", () => {
    service.register(mockBody).subscribe((response) => {
      expect(response).toBeFalsy();
    });

    const req = http.expectOne(`${environment.urlApi}register`);
    expect(req.request.method).toBe("POST");
    req.flush({ error: "error" });

    expect(service.getToken()).toBeNull();
  });

  it("should isAuthenticated return true if token exists", () => {
    service.saveToken("token");
    expect(service.isAuthenticated()).toBeTruthy();
  });

  it("should isAuthenticated return false if token does not exist", () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it("should logout remove token", () => {
    service.saveToken("token");
    service.logout();
    expect(service.getToken()).toBeNull();
  });

  it("should saveToken save token", () => {
    service.saveToken("token");
    expect(service.getToken()).toBe("token");
  });

  afterEach(() => {
    http.verify();
    localStorage.removeItem("token");
  });
});
