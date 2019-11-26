import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  message: string;
  type = 'success';
  delay = 2500;
  private alertSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertSub = this.alertService.alert$
      .subscribe(alert => {
        this.message = alert.text;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          clearInterval(timeout);
          this.message = '';
        }, this.delay);
      })
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }

}
