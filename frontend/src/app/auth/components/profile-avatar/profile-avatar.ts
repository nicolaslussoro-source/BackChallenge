import { Component, input } from '@angular/core';

@Component({
  selector: 'app-profile-avatar',
  imports: [],
  templateUrl: './profile-avatar.html',
})
export class ProfileAvatar {

  nombre = input<string>();
 }
