import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Enrollguard {

  constructor(private auth: AuthService, private userService: UsersService) { }


  // canActivate(): Observable<boolean> {
  //   return this.auth.user$.pipe(switchMap(user =>
  //     this.userService.get(user.uid).valueChanges()
  //    )).pipe(map(AppUser => AppUser.isEnroll));

  //  }
}
