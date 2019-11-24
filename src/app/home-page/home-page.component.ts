import { Component, OnInit } from '@angular/core';
import {Cat, CatsService} from '../services/cats.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cats$ = this.catsService.getAll();
  showCatForm = false;
  searchName = '';

  constructor(private catsService: CatsService) { }

  ngOnInit() {

  }

  createCat(cat: Cat) {
    this.catsService.create(cat)
      .subscribe(() => this.showCatForm = false);

  }
}
