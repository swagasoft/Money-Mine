
import { Component } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'list of courses';
  imageUrl = '../../favicon.ico ';
  isActive = false;



  onKeyUp($event) {
    console.log($event.target.value);
  }
  constructor( db:AngularFireDatabase) {
    db.list('/')
  }


}
