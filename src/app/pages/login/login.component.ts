import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  x: any;
  online: boolean;
  // router: any;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService
    ) {
      if (this.auth.currentUserValue) {
          this.router.navigate(['/']);
      }
   }


  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // this.loggedIn();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // loggedIn() {
  //   if (this.getCookie('user_id') !== null) {
  //     console.log('true');
  //     this.online = true;
  //   } else {
  //     console.log('false');
  //     this.online = false;
  //   }
  // }


  // getter funktion til lettere at indhente formdata
  get f() { return this.form.controls; }


  submitForm() {
    const userdata = {
      username: this.f.username.value,
      password: this.f.password.value
    };

    if (this.f.username.value && this.f.password.value) {
      this.auth.login(userdata)
      .pipe(first())
      .subscribe(
          data => {
              this.x = data;
              console.log(this.x);
              this.router.navigate([this.returnUrl]);
          },
          error => {
              console.log(error);
              this.error = error;
          });
    } else {
      console.error('Udfyld venligst formularen!');
      this.error = 'Udfyld venligst begge felter!';
      // Læg en rød border input på input felterne
      const uInput = document.forms[0][0] as HTMLElement;
      const pInput = document.forms[0][1] as HTMLElement;

      if (this.f.username.value === '') {
        uInput.style.border = '1px solid red';
      } else if (this.f.username.value !== '') {
        uInput.style.border = 'none';
      }
      if (this.f.password.value === '') {
        pInput.style.border = '1px solid red';
      } else if (this.f.password.value !== '') {
        pInput.style.border = 'none';
      }
    }


    // this.http.login(data).subscribe(
    //   res => {
    //     this.x = res;
    //     this.tryLogin();
    //   },
    //   err => {
    //     this.tryLogin();
    //   }
    // );
  }

  tryLogin() {
    if (this.x) {
      this.setCookie('token', this.x.access_token, 7);
      this.setCookie('user_id', this.x.user_id, 7);
      this.online = true;
      console.log(this.x);
      // location.href = '/';
    } else {
      console.log('Du har forkerte oplysninger!');
    }
  }

  logout() {
    this.auth.logout();
    // this.setCookie('token', '', -7);
    // this.setCookie('user_id', '', -7);
    // console.log(document.cookie);
    this.online = false;
    location.reload();
  }

  setCookie(name: string, value: string | number, expireDays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  }

  getCookie(name: string): string {
    const nameLength = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLength) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLength));
      })[0] || null;
  }

  checkCookie() {
    if (this.getCookie('user_id') !== '') {
      return true;
    } else {
      return false;
    }
  }

}
