import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private actorsService: ActorsService) {
    this.genre = this.utilService.genre;
  }

  async ngOnInit() {
    this.createForm();
    this.getActors();
    if (this.route.snapshot.params.id != null) {
      this.id = this.route.snapshot.params.id;
      this.sTitulo = "Editar película";
      this.loading = true;
      this.getMovieByID();
    } else {
      this.sTitulo = "Añadir película";
    }
  }

  async getMovieByID() {
    let res = await this.moviesService.getMovieByID(this.id);
    if (res) {
      this.movie = res.body;
      this.updateForm();
    }
    else
      this.utilService.showToast(ToastMessage.ErrorGeneric);
    this.loading = false;
  }

  async getActors() {
    let res = await this.actorsService.getActors();
    if (res)
      this.actors = res.body;
    else
      this.utilService.showToast(ToastMessage.ErrorGeneric);
  }

  //#region FORM
  createForm() {
    this.formEdit = this.fb.group({
      title: [null, [Validators.required]],
      poster: [null],
      genre: [null],
      year: [null, [Validators.required]],
      duration: [null, [Validators.required]],
      imdbRating: [null, [Validators.required]],
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
      movie.actors = [];
      let actores = [];
      this.movie.actors.forEach(a => actores.push(this.actors.find((act: any) => act.id == a)));
      this.formEdit.setValue(movie);
      this.formEdit.controls['actors'].setValue(actores);
      debugger
      this.loading = false;
    } else {
      this.utilService.showToast(ToastMessage.ErrorGeneric);
      this.loading = false;
    }
  }

  validation_messages = {
    'title': [
      { type: 'required', message: 'Debe de introducir un título.' }
    ],
    'year': [
      { type: 'required', message: 'Debe de introducir un año.' }
    ],
    'duration': [
      { type: 'required', message: 'Debe de introducir una duración.' }
    ],
    'imdbRating': [
      { type: 'required', message: 'Debe de introducir la puntuación de Imdb.' }
    ],
    'actors': [
      { type: 'required', message: 'Debe de seleccionar al menos un actor' }
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
        this.utilService.showToast(ToastMessage.CreateOK, 'Película');
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ErrorGeneric);
        console.log(error);
      });
  }

  async updateMovie() {
    let movie = this.formEdit.value as Movie;
    movie.id = this.id;
    await this.moviesService.updateMovie(movie)
      .finally(() => this.loading = false)
      .then(async res => {
        this.router.navigate(['/pages/movies/list']);
        this.utilService.showToast(ToastMessage.UpdateOK, 'Película');
      })
      .catch((error) => {
        this.utilService.showToast(ToastMessage.ErrorGeneric);
        console.log(error);
      });
  }
}
