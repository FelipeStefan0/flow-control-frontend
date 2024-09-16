import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Month, MonthUtils } from 'src/app/models/Enum/Month';

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
  @Input() type: string = "";
  @Output() emitFilterValue: EventEmitter<any> = new EventEmitter<any>();

  monthUtils!: MonthUtils;

  openedDatepicker: boolean = false;

  currentDate: {
    date: number,
    month: string | number,
    year: number
  } = {
    date: 0,
    month: 0,
    year: 0
  }
  
  filter: {
    date: number,
    month: string | number,
    year: number
  } = {
    date: 0,
    month: 0,
    year: 0
  }

  month: number = new Date().getMonth()+1;

  constructor() { }

  ngOnInit() {
    this.currentDate = {
      date: new Date().getDate(),
      month: this.getMonthToString(new Date().getMonth()),
      year: new Date().getFullYear()
    }
    this.setCurrentDate();
  }

  setCurrentDate() {
    this.filter = JSON.parse(JSON.stringify(this.currentDate));
  }

  getMonthToString(month: number | string): string {
    if(typeof month == "string") return "";
    this.month = month+1;
    let value = Object.values(Month).length;
    for (let i = 0; i < value; i++)
      if (Object.values(Month).indexOf(Object.values(Month)[i]) == month)
        return Object.values(Month)[i].toString();
    return "";
  }

  openCloseDatepicker() {    
    this.openedDatepicker = !this.openedDatepicker;
  }

  getData(event: any) {      
    if(this.type == "month-year") {
      if(event.detail.value && event.detail.value != undefined) {
        this.filter = {
          date: +(event.detail.value as string).substring(8,10),
          month: this.getMonthToString((+(event.detail.value as string).substring(5, 7))-1),
          year: +(event.detail.value as string).substring(0,4)
        }
      } else this.setCurrentDate();
    } else {
      if(event.detail.value && event.detail.value != undefined) {
        this.filter = {
          date: +(event.detail.value as string).substring(8,10),
          month: (+(event.detail.value as string).substring(5, 7))-1,
          year: +(event.detail.value as string).substring(0,4)
        }
      } else this.setCurrentDate();
    }

    this.emitFilterValue.emit(this.filter)
    this.openCloseDatepicker();
  }
}
