import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActionService } from '../services/action.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  actions$!: Observable<any>;
  service = inject(ActionService);
  showCalendar: boolean = false;
  date!: string;

  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    let date = new Date()
    let event = {date: date.getDate(), month: date.getMonth(), year: date.getFullYear()}
    this.list(event);
  }

  list(event?: {date: number, month: number, year: number}) {
    let date: Date = new Date();
    
    if(event) {
      date.setFullYear(event!.year, event!.month, event!.date);
      date.setHours(0-3, 0, 0, 0)
    }
    
    this.actions$ = this.service.listAll({date: date.toISOString().slice(0, -1)}).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  openClose() {
    this.showCalendar = !this.showCalendar;
  }
}
