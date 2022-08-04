import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IntroMainComponent } from '../intro-main/intro-main.component';

@Injectable({
  providedIn: 'root'
})
export class MoveIntroToAboveUsersScreenGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: IntroMainComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canDeactivateSubj;
  }
  
}
