import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

export type AlertType = 'success' | 'warning';

interface Alert {
  type: AlertType;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public alert$: Subject<Alert> = new Subject<Alert>();

  success(text: string) {
    this.alert$.next({ type: 'success', text })
  }

  warning(text: string) {
    this.alert$.next({ type: 'warning', text })
  }
}
