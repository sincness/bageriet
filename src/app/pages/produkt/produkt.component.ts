import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-produkt',
  templateUrl: './produkt.component.html',
  styleUrls: ['./produkt.component.scss']
})
export class ProduktComponent implements OnInit {
  form: FormGroup;
  id = this.router.url.replace('/produkt/', '');
  public data;
  public comments;
  public online;
  public post;


  constructor(public router: Router, private http: HttpService, private fb: FormBuilder) { }

  ngOnInit(): void {

    // const token = localStorage.getItem('token');

    this.form = this.fb.group({
      comment: ['', Validators.required],
    });
    this.data = this.http.getProduct(this.id).subscribe(res => {
      this.data = res;
  });
    this.comments = this.http.getComments(this.id, this.getCookie('token')).subscribe((res: any) => {
      this.comments = {
        count: res.count,
        posts: this.reverse(res.posts)
      };
      console.log(this.comments);
    });
    // this.comments = this.http.getComments(this.id, token).subscribe(res => this.comments = res);
    // console.log(token);


    setTimeout(_ => {
      // console.log(this.data);
    }, 1000);
  }

  like(id: string) {
    console.log(`Du har liket id'et: ${id}`);

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
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  }

  /* Minimum 2 decimaler funktion */
  minDecimals = (n: number) => (n < 10 ? '0' : '') + n;

  /* Tidskonvertingsfunktion */
  timeConverter(timestamp: number){
    const a = new Date(timestamp * 1000);
    const months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = `${date}. ${month} ${year} ${this.minDecimals(hour)}:${this.minDecimals(min)}:${this.minDecimals(sec)}`;
    return time;
  }


  comment(id: string) {
    const data: any = new FormData();
    data.append('title', 'Malthe');
    data.append('comment', this.form.get('comment').value);
    data.append('user_id', this.getCookie('user_id'));
    data.append('product_id', id);
    this.http.postComment(data, this.getCookie('token')).subscribe(
      res => {
        this.post = res;
        this.checkPost();

      },
      err => {
        this.post = err;
        this.checkPost();
      }
    );
  }

  checkPost() {
    if (this.post.message === 'Record created') {
      location.reload();
    } else {
      console.log('Der er sket en fejl!');
    }
  }

  reverse(posts) {
    // return Array.from(posts).reverse();

    const arr = [];
    for (const post of posts) {
      arr.push(post);
    }
    console.log(arr.reverse());

    return arr.reverse();
  }



}
