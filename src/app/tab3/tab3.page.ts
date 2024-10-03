import { Component, inject, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActionService } from '../services/action.service';
import { Action } from '../models/Interfaces/Action';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  actions!: any[] | null;
  service = inject(ActionService);
  nav = inject(NavController)
  showCalendar: boolean = false;
  event!: {date: number, month: number, year: number};
  loading: boolean = true;

  @ViewChild('datepicker') datepicker!: DatepickerComponent;

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.event = {
      date: new Date().getDate(),
      month: new Date().getMonth(), 
      year: new Date().getFullYear()
    }
    this.list(this.event);
    this.datepicker.setCurrentDate();
  }

  list(event?: {date: number, month: number, year: number}) {  
    this.loading = true;
    
    let date: Date = new Date();
    
    if(event) {
      date.setFullYear(event!.year, event!.month, event!.date);
      date.setHours(0-3, 0, 0, 0)
    }
    
    this.service.listAll({date: date.toISOString().slice(0, -1)}).pipe(
      map((res: any) => {
        return res.data;
      })
    ).subscribe({
      next: (data: any) => {
        this.actions = data
      },
      error: () => {
        this.loading = false;
        this.actions = null;
      },
      complete: () => {
        this.loading = false;
      }
    });
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
        this.presentToast(res.message, true);
        this.list(this.event);
      },
      error: (res: { data: null; message: string; status: number }) => {
        this.presentToast(res.message, false);
      }
    })
  }

  async presentToast(message: string, status: boolean) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      cssClass: status ? 'success' : 'failure'
    })

    await toast.present();
  }
}
