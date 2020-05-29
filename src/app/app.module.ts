import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './partials/footer/footer.component';
import { ForsideComponent } from './pages/forside/forside.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { ProdukterComponent } from './pages/produkter/produkter.component';
import { LoginComponent } from './pages/login/login.component';
import { NavComponent } from './partials/nav/nav.component';
import { ProduktComponent } from './pages/produkt/produkt.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { LogudComponent } from './pages/logud/logud.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ForsideComponent,
    KontaktComponent,
    ProdukterComponent,
    LoginComponent,
    NavComponent,
    ProduktComponent,
    LogudComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
