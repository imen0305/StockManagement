import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../Models/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string ='';
  private loggedInUsername: string= '';
  private jwtHelper = new JwtHelperService();
  private tokenKey: string = 'access_token';

  constructor(private http: HttpClient, private router: Router) {}

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.host}/api/v1/auth/authenticate`, { email, password });
  }

  getUserDetails(token: string): Observable<User> {
    return this.http.get<User>(`${this.host}/api/v1/admin/product`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/api/v1/auth/register`, user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    const decodedToken: any = jwtDecode(token);
    const expiryDate = new Date(decodedToken.exp * 1000);

    return expiryDate > new Date();
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User | null {
    const userString = localStorage.getItem('user');
    if (userString !== null) {
      return JSON.parse(userString);
    }
    return null;
  }

  public loadToken(): void {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.token = token;
    } else {
      this.token = ''; // Assign an empty string as a default value
    }
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLogged(): boolean {
    return this.token !== '' && !this.jwtHelper.isTokenExpired(this.token);
  }
}
