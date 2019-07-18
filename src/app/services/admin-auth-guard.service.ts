import { AppUser } from './../models/app-user';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  adminDetails: any;


  constructor(private auth: AuthService, private userService: UsersService) {

    // this.adminDetails = userService.getUserAccount;
   }


   canActivate() {

       if(!this.auth.confirmAdmin){
        console.log(this.auth.confirmAdmin);
       console.log('not admin');
         return false;
       }
       console.log('this is admin');
       console.log(this.auth.confirmAdmin);

       return true;


   }
}
