import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService implements CanActivate {
  constructor(
    private tokenStorage: TokenStorageService,
    private route: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const user = this.tokenStorage.getUser();
    if (user && (user.roles.includes('ROLE_ADMIN') || user.username == 'admin')) {
      return true;
    } else {
      this.route.navigate(['/']);
      setInterval(() => {
        location.reload();
      }, 1000);
      return false;
    }
  }
}