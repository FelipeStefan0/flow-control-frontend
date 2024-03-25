import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class DatepickerComponent {
  openedDatepicker: boolean = false;

  constructor() { }

  openDatepicker() {
    this.openedDatepicker = !this.openedDatepicker;
  }

  getDataFromMonthAndYear(event: Event) {
    console.log(event);
    this.openDatepicker();
  }
}
