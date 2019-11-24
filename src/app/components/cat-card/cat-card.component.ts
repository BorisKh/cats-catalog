import { Component, Input, OnInit } from '@angular/core';
import { Cat } from '../../services/cats.service';

@Component({
  selector: 'app-cat-card',
  templateUrl: './cat-card.component.html',
  styleUrls: ['./cat-card.component.scss']
})
export class CatCardComponent implements OnInit {
  @Input() cat: Cat;

  constructor() { }

  ngOnInit() {
  }

}
