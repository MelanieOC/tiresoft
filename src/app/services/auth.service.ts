import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = environment.url;
  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public user$ = this.user.asObservable()
  
  public token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.setValue()
  }

  setValue() {
    let user = JSON.parse(localStorage.getItem('user_tiresoft'))
    this.token.next(localStorage.getItem('token_tiresoft'));
    if (user) {
      this.user.next(user);
    }

  }

  public get userValue() {
    return this.user.value;
  }

  login(user) {
    return this.http.post(`${this.url}/api/login`, user).pipe(
      tap((response: any) => {
        this.token.next(response.token);
        this.user.next(response.user);
        localStorage.setItem('user_tiresoft', JSON.stringify(response.user));
        localStorage.setItem('token_tiresoft', response.token);
        
      })
    );
  }

  logout() {
    localStorage.clear();
    this.token.next(null);
    this.user.next(null);
    this.router.navigate(['/login']);
  }
}
