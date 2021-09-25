import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorsComponent } from './actors/actors.component';
import { CompaniesComponent } from './companies/companies.component';
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'movies',
      loadChildren: () => import('./movies/movies.module')
        .then(m => m.MoviesModule),
    },
    {
      path: 'actors',
      component: ActorsComponent,
    },
    {
      path: 'companies',
      component: CompaniesComponent,
    },
    {
      path: '',
      redirectTo: 'movies',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
