import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActionService } from '../services/action.service';
import { Action } from '../models/Interfaces/Action';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  actions$!: Observable<any>;
  service = inject(ActionService);
  nav = inject(NavController)
  showCalendar: boolean = false;
  event!: {date: number, month: number, year: number};

  constructor() {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.event = {
      date: new Date().getDate(),
      month: new Date().getMonth(), 
      year: new Date().getFullYear()
    }
    this.list(this.event);
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

  editAction(event: {id: number, action: Action}) {
    this.nav.navigateForward("/tabs/tab2", {state: event})
  }

  deleteAction(id: number) {
    this.service.delete(id).subscribe({
      next: (res: { data: null; message: string; status: number }) => {
        this.toastr(res.message, "success");
        this.list(this.event);
      },
      error: (res: { data: null; message: string; status: number }) => {
        this.toastr(res.message, "failure");
      }
    })
  }

  toastr(message: string, type?: string) {
    let body: Element = document.getElementsByClassName('ion-padding')[0];
    let div: HTMLElement = document.createElement('div');
    let text: HTMLElement = document.createElement('span');

    text.innerHTML = message;
    div.appendChild(text);

    if (type == 'success') div.style.backgroundColor = 'var(--font-success)';
    else if (type == 'failure') div.style.backgroundColor = 'var(--font-failure)';

    div.style.color = 'var(--font-tertiary)';
    div.style.width = '80%';
    div.style.height = '2.5rem';
    div.style.padding = '.2rem';
    div.style.borderRadius = '.5rem';
    div.style.position = 'absolute';
    div.style.top = '1.5rem';
    div.style.left = '50%';
    div.style.transform = 'translateX(-50%)';
    div.style.zIndex = '999';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';

    body.appendChild(div);

    setTimeout(() => {
      body.removeChild(div);
    }, 3000);
  }
}
