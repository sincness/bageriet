import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logud',
  templateUrl: './logud.component.html',
  styleUrls: ['./logud.component.scss']
})
export class LogudComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.setCookie('token', '', -7);
    this.setCookie('user_id', '', -7);
    this.auth.logout();
    location.replace('/login');
  }

  setCookie(name: string, value: string | number, expireDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  }
}
