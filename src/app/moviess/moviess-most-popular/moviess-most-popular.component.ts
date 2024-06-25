import { Component, OnInit } from '@angular/core';
import { MoviessService } from '../servicess/moviess.service';

@Component({
  selector: 'app-moviess-most-popular',
  templateUrl: './moviess-most-popular.component.html',
  styleUrls: ['./moviess-most-popular.component.css']
})
export class MoviessMostPopularComponent implements OnInit {
  listaMoviess: any[];
  
  constructor(
    private moviessService: MoviessService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }
  private async loadMovies(){
    const moviess = await this.moviessService.listaMoviesPopular(); 
    this.listaMoviess = moviess.results,
    console.log('moviess.results');
  }
  deleteMovies(index: number){
   console.log(index)
    this.listaMoviess.splice(index, 1)
  }
}
