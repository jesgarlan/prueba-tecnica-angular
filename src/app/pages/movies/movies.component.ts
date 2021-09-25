import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-movies',
  template: `<router-outlet></router-outlet>`,
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
