import { Component } from '@angular/core';
import { Month } from '../models/Month';
import { Report } from '../models/Report';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  year!: number;
  month!: string;

  report: Report[] = [];
  reportOne: Report = {
    id: 0,
    year: 2024,
    month: Month.FEBRUARY,
    total_value: 250.00,
    in_total_value: 300.00,
    out_total_value: 50.00,
    actions: []
  }

  constructor() {
    this.report.push(this.reportOne)
  }

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
}
