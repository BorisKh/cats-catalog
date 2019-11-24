import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Cat, CatsService} from '../services/cats.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-cat-page',
  templateUrl: './cat-page.component.html',
  styleUrls: ['./cat-page.component.scss']
})
export class CatPageComponent implements OnInit, OnDestroy {
  cat$: Observable<Cat>;
  private iSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private catsService: CatsService
  ) { }

  ngOnInit() {
    this.iSub = this.route.params
      .subscribe((params: Params) => {
        this.cat$ = this.catsService.getOne(params['id']);
      });
  }

  ngOnDestroy() {
    this.iSub.unsubscribe();
  }
}
