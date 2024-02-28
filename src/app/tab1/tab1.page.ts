import { Component } from '@angular/core';
import { Month } from '../models/Month';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  year!: number;
  month!: string;

  openedDatepicker: boolean = false;

  constructor() {}

  ngOnInit() {
    this.year = new Date().getFullYear();
    this.month = this.getMonthToString();
  }

  getMonthToString(): string {
    let currentMonth = new Date().getMonth();
    let value = Object.values(Month).length;
    for (let i = 0; i < value; i++)
      if (Object.values(Month).indexOf(Object.values(Month)[i]) == currentMonth)
        return Object.values(Month)[i].toString();
    return "";
  }

  openDatepicker() {
    this.openedDatepicker = !this.openedDatepicker;
  }
}
