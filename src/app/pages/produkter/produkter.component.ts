import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-produkter',
  templateUrl: './produkter.component.html',
  styleUrls: ['./produkter.component.scss']
})
export class ProdukterComponent implements OnInit {
  public selected;
  public data;
  public data1;
  public products;
  public categories;
  public filtered;
  public sortBy;
  activeLink = this.sortBy;

  constructor(private http: HttpService) {
    if (this.sortBy === undefined) {
      this.sortBy = 'Morgenbrød';
    }

    this.data = this.http.getData().subscribe(d => {
      this.data = d;
      this.categories = this.data.categories;
      this.categories.forEach(i => {
        if (i.title === this.sortBy ) {
          this.filtered = i.products;
        }
      });
    });
   }

  ngOnInit(): void {

    this.products = this.http.getProducts().subscribe(d => {
      this.data1 = d;
      this.products = this.data1.products;
    });


  }

  filter(category: string) {

    // this.remSelected();
    const categoriesElements = document.querySelectorAll('#sidenav > ul > li > a');
    const categoriesArray = Array.from(categoriesElements);

    categoriesArray.forEach(c => {

      if (c.textContent === category) {
        const value = c.textContent;
        // c.classList.add('active');
        this.change(value);

        // this.change(x);
      }
    });

    this.sortBy = category;


  }


  change(value: string) {
    this.data = this.http.getData().subscribe(d => {
      this.data = d;
      this.categories = this.data.categories;
      this.categories.forEach(i => {
        if (i.title === value ) {
          this.filtered = i.products;
        }
      });
    });
  }

  remSelected() {
    const activeElement = document.querySelector('.active');
    if (activeElement) {
      activeElement.classList.remove('active');
    }
  }

  addSelected(category: string) {
    const categoriesElements = document.querySelectorAll('#sidenav > ul > li > a');
    const categoriesArray = Array.from(categoriesElements);

    categoriesArray.forEach(c => {
      if (c.textContent === category) {
        this.selected = c.textContent;
        c.classList.add('active');
      }
    });
  }

}
