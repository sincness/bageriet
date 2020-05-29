import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss']
})
export class ForsideComponent implements OnInit {
  public data;
  public data1;

  public news;
  public categories;
  public products;

  constructor(private http: HttpService) {

   }

  ngOnInit(): void {
    this.data = this.http.getData().subscribe(d => {
      this.data = d;
      this.news = this.data.news;
      this.categories = this.data.categories;
    });

    this.products = this.http.getProducts().subscribe(d => {
      this.data1 = d;
      this.products = this.data1.products;
    });



    setTimeout(() => {
      console.log(this.categories);
    }, 1000);

    window.addEventListener('load', e => {
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slider figure') as NodeListOf<HTMLElement>;
      const leftie = document.getElementById('leftie');
      const rightie = document.getElementById('rightie');

      let move = 1;
      let counter = 0;
      const dots = document.querySelectorAll('.dot') as NodeListOf<HTMLElement>;
      leftie.onclick = _ => {
        if (counter >= 1) {
          // tslint:disable-next-line: prefer-for-of
          for (let z = 0; z < dots.length; z++) {
            const element = dots[z] as HTMLElement;
            element.style.opacity = '.45';
          }
          counter--;
          dots[counter].style.opacity = '.9';
          move = slider.clientWidth * counter;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < slides.length; i++) {
            const elm = slides[i] as HTMLElement;
            elm.style.transform = `translateX(-${move}px)`;
          }
        }
        };

      rightie.onclick = _ => {
        if (counter < slides.length - 1) {
          // tslint:disable-next-line: prefer-for-of
          for (let z = 0; z < dots.length; z++) {
            const element = dots[z] as HTMLElement;
            element.style.opacity = '.45';
          }
          counter++;
          dots[counter].style.opacity = '.9';
          move = slider.clientWidth * counter;
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < slides.length; i++) {
            const elm = slides[i] as HTMLElement;
            elm.style.transform = `translateX(-${move}px)`;
          }
          }
      };


      // tslint:disable-next-line: prefer-for-of
      for (let z = 0; z < dots.length; z++) {
        const element = dots[z] as HTMLElement;
        element.style.opacity = '.45';
        element.onclick = _ => {
          console.log(slider.clientWidth * z);
          // tslint:disable-next-line: prefer-for-of
          for (let o = 0; o < dots.length; o++) {
            const elm = dots[o] as HTMLElement;
            elm.style.opacity = '.45';
          }
          element.style.opacity = '.9';
          // tslint:disable-next-line: prefer-for-of
          for (let o = 0; o < slides.length; o++) {
            slides[o].style.transform = `translateX(-${slider.clientWidth * z}px)`;
          }
        };
      }

      dots[0].style.opacity = '.9';


    });
  }

  // tilmeld() {
  //   const frm = document.querySelector('form') as unknown as HTMLElement;
  //   const input = document.forms[0][0] as unknown as HTMLElement;
  //   if (input.value === '') {
  //     console.log(input.value);

  //     frm.style.border = '1px solid red';
  //     console.log('Husk at udfylde din email');
  //   } else if (input.value !== null) {
  //     frm.style.border = '';

  //     console.log('Husk at udfylde en error handling samt redirect til takkeside');
  //     // location.href = '/tak';

  //   }
  // }






}
