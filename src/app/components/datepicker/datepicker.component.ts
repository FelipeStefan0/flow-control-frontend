import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Month } from 'src/app/models/Month';

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
  @Output() emitFilterValue: EventEmitter<any> = new EventEmitter<any>();
  openedDatepicker: boolean = false;

  currentMonth: string = "";
  currentYear!: number;
  
  filter = {
    month: "",
    year: 0
  }

  constructor() { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = this.getMonthToString(new Date().getMonth());
    this.filter.year = this.currentYear;
    this.filter.month = this.currentMonth;
  }

  getMonthToString(monthNumber: number): string {
    let value = Object.values(Month).length;
    for (let i = 0; i < value; i++)
      if (Object.values(Month).indexOf(Object.values(Month)[i]) == monthNumber)
        return Object.values(Month)[i].toString();
    return "";
  }

  openDatepicker() {
    this.openedDatepicker = !this.openedDatepicker;
  }

  getDataFromMonthAndYear(event: any) {
    if(event.detail.value) {
      this.filter.month = this.getMonthToString((+(event.detail.value as string).substring(5, 7))-1);
      this.filter.year = +(event.detail.value as string).substring(0,4)
    } else {
      this.filter.month = this.currentMonth;
      this.filter.year = this.currentYear;
    }
    this.emitFilterValue.emit(this.filter)
    this.openDatepicker();
  }
}
