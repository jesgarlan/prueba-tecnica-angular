import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorsService {

  private url: string = environment.urlBack;

  constructor(public http: HttpClient) {
  }

  async getActors(): Promise<any> {
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    let url = `${this.url}/actors`;
    return await this.http.get(url, { headers, observe: 'response' }).toPromise();
  }
}
