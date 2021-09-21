import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.auth.token.value && this.auth.user.value) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    let permissions = this.auth.user.value.permissions.map(p => p.slug);
    let all = permissions.filter(p => route.data.all ? p.includes(route.data.all) : false)
    if (permissions.indexOf(route.data.permission) !== -1 || route.data.permission === 'all' || all.length > 0) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
