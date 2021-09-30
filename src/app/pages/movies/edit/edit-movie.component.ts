import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Movie } from 'src/app/@core/model/Movie';
import { ActorsService } from 'src/app/@core/services/actors.service';
import { MoviesService } from 'src/app/@core/services/movies.service';
import { ToastMessage } from 'src/app/@core/services/ToastMessage';
import { UtilService } from 'src/app/@core/services/util.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent implements OnInit {

  public id: string;
  public formEdit: FormGroup;
  public sTitulo: string;
  public loading: boolean;
  public movie: Movie = new Movie();
  public genre: string[];
  public actors: any[];

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private moviesService: MoviesService,
    private utilService: UtilService,
    private router: Router,
    private actorsService: ActorsService,
    private translate: TranslateService) {
    this.genre = this.utilService.genre;
  }

  async ngOnInit() {
    this.loading = true;
    this.createForm();
    this.getActors();
    if (this.route.snapshot.params.id != null) {
      this.id = this.route.snapshot.params.id;
      this.sTitulo = this.translate.instant('edit-movie.title-edit');
      this.getMovieByID();
    } else {
      this.sTitulo = this.translate.instant('edit-movie.title-create');
      this.loading = false;
    }
  }

  async getMovieByID() {
    await this.moviesService.getMovieByID(this.id)
      .finally(() => this.loading = false)
      .then(async (res) => {
        this.movie = res.body;
        this.updateForm();
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

  async getActors() {
    await this.actorsService.getActors()
      .then(async (res) => {
        this.actors = res.body;
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

  //#region FORM
  createForm() {
    this.formEdit = this.fb.group({
      title: [null, [Validators.required]],
      poster: [null],
      genre: [null],
      year: [null, [Validators.compose([Validators.required, Validators.max((new Date()).getFullYear())])]],
      duration: [null, [Validators.compose([
        Validators.required, Validators.min(0)])]],
      imdbRating: [null, [Validators.compose([
        Validators.required, Validators.min(0), Validators.max(10)
      ])]],
      actors: [null, [Validators.required]],
    });
  }

  async updateForm() {
    if (this.movie) {
      let movie: Movie = new Movie();
      movie.title = this.movie.title;
      movie.poster = this.movie.poster;
      movie.genre = this.movie.genre;
      movie.year = this.movie.year;
      movie.duration = this.movie.duration;
      movie.imdbRating = this.movie.imdbRating;
      movie.actors = this.movie.actors.map(a => a.toString());
      this.formEdit.setValue(movie);
      this.loading = false;
    } else {
      this.utilService.showToast(ToastMessage.ErrorGeneric);
      this.loading = false;
    }
  }

  validation_messages = {
    'title': [
      { type: 'required', message: this.translate.instant('edit-movie.validations.title.required') },
    ],
    'year': [
      { type: 'required', message: this.translate.instant('edit-movie.validations.year.required') },
      { type: 'max', message: this.translate.instant('edit-movie.validations.year.max') }
    ],
    'duration': [
      { type: 'required', message: this.translate.instant('edit-movie.validations.duration.required') },
      { type: 'min', message: this.translate.instant('edit-movie.validations.duration.min') }
    ],
    'imdbRating': [
      { type: 'required', message: this.translate.instant('edit-movie.validations.imdbRating.required') },
      { type: 'min', message: this.translate.instant('edit-movie.validations.imdbRating.min') },
      { type: 'max', message: this.translate.instant('edit-movie.validations.imdbRating.max') },
    ],
    'actors': [
      { type: 'required', message: this.translate.instant('edit-movie.validations.actors.required') }
    ]
  };

  async submitForm() {
    if (this.formEdit.valid) {
      //El formulario es válido
      this.loading = true;
      if (this.id == undefined) {
        // Nueva película
        this.createMovie();
      } else {
        // Actualizando asset
        this.updateMovie();
      }
    } else {
      //El formulario no es válido
      this.utilService.validateForm(this.formEdit);
      this.utilService.showToast(ToastMessage.ValidationError);
    }
  }
  //#endregion FORM

  async createMovie() {
    let movie = this.formEdit.value as Movie;
    await this.moviesService.createMovie(movie)
      .finally(() => this.loading = false)
      .then(async res => {
        this.router.navigate(['/pages/movies/list']);
        this.utilService.showToast(ToastMessage.CreateOK, this.translate.instant('toast.movie'));
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }

  async updateMovie() {
    let movie = this.formEdit.value as Movie;
    movie.id = this.id;
    await this.moviesService.updateMovie(movie)
      .finally(() => this.loading = false)
      .then(async res => {
        this.router.navigate(['/pages/movies/list']);
        this.utilService.showToast(ToastMessage.UpdateOK, this.translate.instant('toast.movie'));
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ShowError, this.translate.instant('edit-movie.show-error'));
      });
  }
}
