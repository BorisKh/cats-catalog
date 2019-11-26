import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Cat, CatsService} from '../services/cats.service';
import {Observable, Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-cat-page',
  templateUrl: './cat-page.component.html',
  styleUrls: ['./cat-page.component.scss']
})
export class CatPageComponent implements OnInit, OnDestroy {
  cat$: Observable<Cat>;
  editMode = false;
  private iSub: Subscription;
  private updateSub: Subscription;
  private removeSub: Subscription;
  private likeSub: Subscription;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private catsService: CatsService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.iSub = this.route.params
      .subscribe((params: Params) => {
        this.cat$ = this.catsService.getOne(params['id']);
      });
  }

  ngOnDestroy() {
    if (this.iSub) {
      this.iSub.unsubscribe();
    }
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
    if (this.removeSub) {
      this.removeSub.unsubscribe();
    }
    if (this.likeSub) {
      this.likeSub.unsubscribe();
    }
  }

  updateCat(cat: Cat) {
    this.updateSub = this.catsService.update(cat)
      .subscribe(() => {
        this.alertService.success('Кот успешно обновлен');
        this.router.navigate(['/']);
      });
  }

  removeCat(id: string) {
    this.removeSub = this.catsService.remove(id)
      .subscribe(() => {
        this.alertService.warning('Кот был удален');
        this.router.navigate(['/']);
      });
  }

  likeCate(id: string) {
    this.likeSub = this.catsService.like(id)
      .subscribe();
  }
}
