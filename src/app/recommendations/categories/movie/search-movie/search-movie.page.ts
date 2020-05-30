import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search-movie',
  templateUrl: './search-movie.page.html',
  styleUrls: ['./search-movie.page.scss'],
})
export class SearchMoviePage implements OnInit {
  movieSearch = new FormGroup({
    movie: new FormControl("", Validators.required),
  });
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    console.log(this.movie.value);
  }
  
  get movie(): AbstractControl {
    return this.movieSearch.get("movie");
  }
}
