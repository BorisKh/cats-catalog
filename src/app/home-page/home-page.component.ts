import {Component, OnDestroy,} from '@angular/core';
import {Cat, CatsService} from '../services/cats.service';
import {Subscription} from 'rxjs';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {
  cats$ = this.catsService.getAll();
  shownCatForm = false;
  searchName = '';
  private createSub: Subscription;

  constructor(
    private catsService: CatsService,
    private alertService: AlertService
  ) { }

  ngOnDestroy() {
    if (this.createSub) {
      this.createSub.unsubscribe();
    }
  }

  createCat(cat: Cat) {
    this.createSub = this.catsService.create(cat)
      .subscribe(() => {
        this.shownCatForm = false;
        this.alertService.success('Кот был создан');
      });

  }
}
