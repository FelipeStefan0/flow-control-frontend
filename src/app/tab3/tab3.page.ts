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

  constructor() {
    this.list();
  }

  list() {
    this.actions$ = this.service.listAll().pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  openClose() {
    this.showCalendar = !this.showCalendar;
  }

  emitFilterValue(event: {date: number, month: number, year: number}) {
    // let date: Date = new Date();
    // date.setFullYear(event.year, event.month, event.date);
    // date.setHours(0, 0, 0, 0)
    // console.log(date.get);
    this.actions$ = this.service.getByDate(event).pipe(map((res: any) => {
      return res.data;
    }))
  }
}
