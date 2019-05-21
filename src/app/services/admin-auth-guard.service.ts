import { AppUser } from './../models/app-user';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UsersService) {

   }

   canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(switchMap(user =>
      this.userService.get(user.uid).valueChanges()
     )).pipe(map(AppUser => AppUser.isAdmin));

   }
}
