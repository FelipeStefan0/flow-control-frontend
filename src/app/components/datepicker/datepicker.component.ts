import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() type: string = "";
  @Output() emitFilterValue: EventEmitter<any> = new EventEmitter<any>();

  openedDatepicker: boolean = false;

  currentDate = {
    day: 0,
    month: "",
    year: 0
  }
  
  filter = {
    day: 0,
    month: "",
    year: 0
  }

  constructor() { }

  ngOnInit() {
    this.currentDate = {
      day: new Date().getDate(),
      month: this.getMonthToString(new Date().getMonth()),
      year: new Date().getFullYear()
    }
    this.setCurrentDate();
  }

  setCurrentDate() {
    this.filter = JSON.parse(JSON.stringify(this.currentDate))
  }

  getMonthToString(monthNumber: number): string {
    let value = Object.values(Month).length;
    for (let i = 0; i < value; i++)
      if (Object.values(Month).indexOf(Object.values(Month)[i]) == monthNumber)
        return Object.values(Month)[i].toString();
    return "";
  }

  openCloseDatepicker() {
    this.openedDatepicker = !this.openedDatepicker;
  }

  getData(event: any) {
    if(event.detail.value) {
      this.filter = {
        day: +(event.detail.value as string).substring(8,10),
        month: this.getMonthToString((+(event.detail.value as string).substring(5, 7))-1),
        year: +(event.detail.value as string).substring(0,4)
      }
    } else this.setCurrentDate();
    this.emitFilterValue.emit(this.filter)
    this.openCloseDatepicker();
  }
}
