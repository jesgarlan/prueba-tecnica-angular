import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/@core/model/Movie';
import { ActorsService } from 'src/app/@core/services/actors.service';
import { MoviesService } from 'src/app/@core/services/movies.service';
import { ToastMessage } from 'src/app/@core/services/ToastMessage';
import { UtilService } from 'src/app/@core/services/util.service';

@Component({
  selector: 'app-show-movie',
  templateUrl: './show-movie.component.html',
  styleUrls: ['./show-movie.component.scss']
})
export class ShowMovieComponent implements OnInit {

  public id: string;
  public movie: Movie = new Movie();
  public loading: boolean;
  public actors: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private utilService: UtilService,
    private actorsService: ActorsService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params.id;
    this.getMovieByID();
  }

  async getMovieByID() {
    let res = await this.moviesService.getMovieByID(this.id);
    if (res) {
      this.movie = res.body;
      let actors: [] = (await this.actorsService.getActors()).body;
      this.movie.actors.forEach(a => this.actors.push(actors.find((act: any) => act.id == a)));
    }
    else
      this.utilService.showToast(ToastMessage.ErrorGeneric);
    this.loading = false;
  }

  async deleteMovie() {
    this.loading = true;
    await this.moviesService.deleteMovie(this.id)
      .finally(() => this.loading = false)
      .then(async res => {
        this.router.navigate(['/pages/movies/list']);
        this.utilService.showToast(ToastMessage.DeleteOK, 'Película');
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ErrorGeneric);
        console.log(error);
      });
  }
}
