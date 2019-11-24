import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { map } from 'rxjs/operators';
import {switchMap, take, tap} from 'rxjs/internal/operators';

export interface Cat {
  _id: string;
  name: string;
  like: number;
  img: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatsService {
  url = 'assets/cats.json';
  private catsSubject$ = new BehaviorSubject<Cat[]>(null);
  private cats$ = this.catsSubject$.asObservable();

  constructor(private http: HttpClient) { }

  getAll() {
    return this.cats$
      .pipe(
        take(1),
        switchMap(cats => {
          if (!cats) {
            return this.http.get<Cat[]>(this.url)
          }
          return of(cats);
        }),
        tap(cats => this.catsSubject$.next(cats))
      );
  }

  getOne(id: string) {
    return this.http.get<Cat[]>(this.url)
      .pipe(
        map(card => {
          return card.find(item => item._id === id);
        })
      );
  }

  create(cat: Cat): Observable<Cat[]> {
    return this.cats$
      .pipe(
        take(1),
        map(cats => {
          cats.push(cat);
          this.catsSubject$.next(cats);
          return cats;
        })
      );
  }
}
