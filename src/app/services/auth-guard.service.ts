import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate  {


  constructor(
    private auth: AuthService,
    private router: Router,
    ) {

  }
  canActivate(route, state: RouterStateSnapshot){
  return this.auth.user$.pipe(map(user => {
    // this.collectionRef.subscribe(val => this.confirmAdmin =  val[0]['isAdmin']);

    if(user) return true;

    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }));

  }
}
