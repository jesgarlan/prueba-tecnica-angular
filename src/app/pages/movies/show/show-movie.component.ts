import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from 'src/app/@core/model/Movie';
import { ActorsService } from 'src/app/@core/services/actors.service';
import { AlertMessage } from 'src/app/@core/services/AlertMessage';
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
  public movie: Movie;
  public loading: boolean;
  public actors: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService,
    private utilService: UtilService,
    private actorsService: ActorsService,
    private router: Router,
    public translate: TranslateService) { }

  ngOnInit() {
    this.loading = true;
    this.id = this.activatedRoute.snapshot.params.id;
    this.getMovieByID();
  }

  async getMovieByID() {
    await this.moviesService.getMovieByID(this.id)
      .then(async (res) => {
        this.movie = res.body;
        this.getActorsByMovie();
      })
      .catch((error) => {
        this.loading = false
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

  async getActorsByMovie() {
    await this.actorsService.getActors()
      .finally(() => this.loading = false)
      .then(async (res) => {
        let actors = res.body;
        this.movie.actors.forEach(a => this.actors.push(actors.find((act: any) => act.id == a)));
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

  async deleteMovie() {
    await this.utilService.message(AlertMessage.GenericQuestion, this.translate.instant('sweet-alert.delete-movie'))
      .then(async (value) => {
        if (value.isConfirmed) {
          this.loading = true;
          await this.moviesService.deleteMovie(this.id)
            .finally(() => this.loading = false)
            .then(async res => {
              this.router.navigate(['/pages/movies/list']);
              this.utilService.showToast(ToastMessage.DeleteOK, this.translate.instant('toast.movie'));
            })
            .catch((error) => {
              this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
            });
        }
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }
}
