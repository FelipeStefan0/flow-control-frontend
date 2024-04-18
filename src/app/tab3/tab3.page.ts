import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActionService } from '../services/action.service';
import { Action } from '../models/Action';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  actions$!: Observable<any>;
  service = inject(ActionService);

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
}
