import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUser, selectLoading } from '../frontier/utils/store/selectors';
import { UserInterface } from '../store/interfaces/user-interface';
import { setUserAction } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user: UserInterface;

  constructor(private store: Store<any>, private router: Router) {

  }

  private selectUserValue() {
    let user$ = this.store.select(selectUser)
    user$.subscribe((value) => { this.user = value; })
  }

  private isUserAuthenticated(user: UserInterface) {
    if (user) { return true; }
    return this.router.parseUrl('/login');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.checkUrlParams();
    this.selectUserValue();
    return this.isUserAuthenticated(this.user);
  }

  checkUrlParams() {
    let queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let agentId = urlParams.get("agentId");
    if (!agentId)
      return
    let user: UserInterface = {
      agentId,
      name: "",
    }
    this.store.dispatch(setUserAction(user));
  }

}
