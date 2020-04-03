import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor( private http: HttpClient ) { }


  getPosts() {
    return this.http.get(this.URL).pipe(
      tap( console.log )
    );
  }

}
