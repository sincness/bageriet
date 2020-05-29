import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('https://api.mediehuset.net/bakeonline/');
  }

  getProducts() {
    return this.http.get('https://api.mediehuset.net/bakeonline/products');
  }

  getProduct(id: string) {
    return this.http.get(`https://api.mediehuset.net/bakeonline/products/${id}`);
  }

  getComments(id: string, token: string) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    header.append('Access-Control-Allow-Origin', '*');
    return this.http.get(`https://api.mediehuset.net/bakeonline/comments/${id}`, { headers: header });
  }

  // getComments(id: string) {
  //   return this.http.get(`https://api.mediehuset.net/bakeonline/comments/${id}`);
  // }

  postComment(data, token: string) {
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    header.append('Access-Control-Allow-Origin', '*');
    return this.http.post('https://api.mediehuset.net/bakeonline/comments', data, { headers: header });
  }

  login(data) {
    return this.http.post('https://api.mediehuset.net/token', data);
  }


}
