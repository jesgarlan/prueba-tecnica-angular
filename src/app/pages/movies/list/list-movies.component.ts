import { Component, OnInit } from '@angular/core';
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
    private utilService: UtilService) { }

  ngOnInit() {
    this.loading = true;
    this.getMovies();
  }

  async getMovies() {
    let res = await this.moviesService.getMovies();
    if (res) {
      this.movies = res.body;
      console.log(this.movies);
    }
    else
      this.utilService.showToast(ToastMessage.ErrorGeneric);
    this.loading = false;
  }

}
