import { AngularFirestore } from '@angular/fire/firestore';
import { AuthGuardService } from './auth-guard.service';
import { AppUser } from './../models/app-user';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  collectionRef: any;
 userRole: string;

  constructor(
    private authGuard: AuthGuardService ,
    private userService: UsersService,
    private database: AngularFirestore,
    private router: Router
     ) {
      this.userRole = localStorage.getItem('userRole');

   }



   canActivate() {

        if (this.userRole === 'admin') {
          return true;
         } else {
          this.router.navigate(['/welcome']);
          return false;
         }


   }


}
