import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  // online = false;
  online: boolean;
  constructor(private auth: AuthService) {
    // skift online boolean til true hvis brugeren er logget ind
    // if (this.auth.currentUserValue) {
    //     this.online = true;
    // }

    // lige med en ternary, bare fordi man kan, og fordi man burde
    this.online = this.auth.currentUserValue ? true : false;
    // this.online = this.auth.isLoggedIn();
   }

  ngOnInit(): void {
    // this.loggedIn();
  }



  // getCookie(name: string): string {
  //   const nameLength = (name.length + 1);
  //   return document.cookie
  //     .split(';')
  //     .map(c => c.trim())
  //     .filter(cookie => {
  //       return cookie.substring(0, nameLength) === `${name}=`;
  //     })
  //     .map(cookie => {
  //       return decodeURIComponent(cookie.substring(nameLength));
  //     })[0] || null;
  // }

  // loggedIn() {
  //   if (this.getCookie('user_id') !== null) {
  //     console.log('true');
  //     this.online = true;
  //   } else {
  //     console.log('false');
  //     this.online = false;
  //   }
  // }

}
