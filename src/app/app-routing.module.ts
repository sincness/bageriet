import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForsideComponent } from './pages/forside/forside.component';
import { ProdukterComponent } from './pages/produkter/produkter.component';
import { KontaktComponent } from './pages/kontakt/kontakt.component';
import { LoginComponent } from './pages/login/login.component';
import { ProduktComponent } from './pages/produkt/produkt.component';
import { LogudComponent } from './pages/logud/logud.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'forside', pathMatch: 'full' },
  { path: 'forside', component: ForsideComponent, pathMatch: 'full' },
  { path: 'produkter', component: ProdukterComponent, pathMatch: 'full' },
  { path: 'kontakt', component: KontaktComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logud', component: LogudComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'produkt/:id', component: ProduktComponent, pathMatch: 'full', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
