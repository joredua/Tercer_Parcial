import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviessService {
  
  private moviessurl = 'https://api.themoviedb.org/3/movie/popular?api_key=037ec0f2278d48315d2d16612822c1aa';
  constructor(
    private http: HttpClient
  ) { }

  listaMoviesPopular(): Promise<any>{
    return this.http.get(this.moviessurl).toPromise();
  }
  
}
