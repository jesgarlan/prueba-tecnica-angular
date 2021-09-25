import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMovieComponent } from './edit/edit-movie.component';
import { ListMoviesComponent } from './list/list-movies.component';
import { MoviesComponent } from './movies.component';
import { ShowMovieComponent } from './show/show-movie.component';

const routes: Routes = [{
  path: '',
  component: MoviesComponent,
  children: [
    {
      path: 'list',
      component: ListMoviesComponent,
    },
    {
      path: 'show/:id',
      component: ShowMovieComponent,
    },
    {
      path: 'edit/:id',
      component: EditMovieComponent,
    },
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }

export const routedComponents = [
  MoviesComponent,
  ListMoviesComponent,
  ShowMovieComponent,
  EditMovieComponent
];
