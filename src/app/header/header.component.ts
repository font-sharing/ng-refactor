import {Component, OnInit} from '@angular/core';
import { Profile } from './../../domain/models';
import TimeProvider from './../../domain/timeProvider';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  profile: Profile = {
    name: 'Tim',
    birthday: {
      month: 6,
      day: 1
    }
  };

  constructor() {
  }

  ngOnInit() {
  }

  profileCaption = () => this.profile.name === '' ? 'Profile' : `${this.profile.name}${this.isBirthday() ? '🎂' : ''}`;

  private isBirthday() {
    const today =  TimeProvider.now();
    return today.getMonth() === this.profile.birthday.month - 1 && today.getDate() === this.profile.birthday.day;
  }
}
