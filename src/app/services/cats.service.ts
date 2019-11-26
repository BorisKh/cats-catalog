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
  private nextId: string;

  constructor(private http: HttpClient) { }

  get nextIdValue(): string {
    return this.nextId;
  }

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
        tap(cats => {
          this.catsSubject$.next(cats);
          const currentId = cats.reduce((max, p) => Number(p._id) > max ? Number(p._id) : max, Number(cats[0]._id));
          this.setNextId(currentId);
        })
      );
  }

  getOne(id: string) {
    return this.cats$
      .pipe(
        take(1),
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
          const currentId = cats.reduce((max, p) => Number(p._id) > max ? Number(p._id) : max, Number(cats[0]._id));
          this.setNextId(currentId);
          return cats;
        })
      );
  }

  update(cat: Cat): Observable<Cat[]> {
    return this.cats$
      .pipe(
        take(1),
        map(cats => {
          const currentCat = cats.find(catItem => catItem._id === cat._id);
          Object.assign(currentCat, cat);
          this.catsSubject$.next(cats);
          return cats;
        })
      );
  }

  remove(id: string): Observable<Cat[]> {
    return this.cats$
      .pipe(
        take(1),
        map(cats => {
          cats = cats.filter(item => item._id !== id);
          this.catsSubject$.next(cats);
          return cats;
        })
      );
  }

  setNextId(id: number) {
    this.nextId = (id + 1).toString();
  };

  like(id: string): Observable<Cat[]> {
    return this.cats$
      .pipe(
        take(1),
        map(cats => {
          cats.find(catItem => catItem._id === id).like++;
          this.catsSubject$.next(cats);
          return cats;
        })
      );
  }
}
