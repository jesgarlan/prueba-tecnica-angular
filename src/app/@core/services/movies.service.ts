import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../model/Movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private url: string = environment.urlBack;

  constructor(public http: HttpClient) {
  }

  async getMovies(): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/movies`;
    return await this.http.get(url, { headers, observe: 'response' }).toPromise();
  }

  async getMoviesPage(page: number, pageSize: number): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/movies?_start=${pageSize * (page - 1)}&_limit=${pageSize}`;
    return await this.http.get(url, { headers, observe: 'response' }).toPromise();
  }


  async getMovieByID(id: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/movies/${id}`;
    return await this.http.get(url, { headers, observe: 'response' }).toPromise();
  }

  async createMovie(movie: Movie): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/movies`;
    return await this.http.post(url, movie, { headers, observe: 'response' }).toPromise();
  }

  async updateMovie(movie: Movie): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/movies/${movie.id}`;
    return await this.http.put(url, movie, { headers, observe: 'response' }).toPromise();
  }

  async deleteMovie(id: string): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/movies/${id}`;
    return await this.http.delete(url, { headers, observe: 'response' }).toPromise();
  }
}
