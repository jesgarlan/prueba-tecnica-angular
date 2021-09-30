import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MoviesService } from 'src/app/@core/services/movies.service';
import { ToastMessage } from 'src/app/@core/services/ToastMessage';
import { UtilService } from 'src/app/@core/services/util.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {

  public movies: [] = [];
  public loading: boolean;

  constructor(private moviesService: MoviesService,
    private utilService: UtilService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getMovies();
  }

  async getMovies() {
    await this.moviesService.getMovies()
      .finally(() => this.loading = false)
      .then((res) => {
        this.movies = res.body;
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

}
