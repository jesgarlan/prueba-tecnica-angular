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
  public p: number = 1;
  public pageSize: number = 3;
  public totalCount: number;

  constructor(private moviesService: MoviesService,
    private utilService: UtilService,
    private translate: TranslateService) {
  }

  ngOnInit() {
    this.loading = true;
    this.getMoviesPage();
  }

  async getMoviesPage() {
    await this.moviesService.getMoviesPage(this.p, this.pageSize)
      .finally(() => this.loading = false)
      .then((res) => {
        this.movies = res.body;
        this.totalCount = res.headers.get('X-Total-Count');
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

  pageChanged(event) {
    this.loading = true;
    this.p = event;
    this.getMoviesPage();
  }
}
