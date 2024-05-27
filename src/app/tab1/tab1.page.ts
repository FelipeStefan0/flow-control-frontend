import { Component, inject } from '@angular/core';
import { ReportService } from '../services/report.service';
import { Month, MonthUtils } from '../models/Enum/Month';
import { Report } from '../models/Interfaces/Report';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  service = inject(ReportService);
  stringToEnumName: MonthUtils = new MonthUtils();
  report!: Report;

  constructor() {}

  ngOnInit() {
    this.getReport(
      this.stringToEnumName.translateEnumName(
        new DatepickerComponent().getMonthToString(new Date().getMonth())
      ),
      new Date().getFullYear()
    );
  }

  getReport(enumName: string, year: number) {
    this.service
      .getReport({ month: enumName, year: year })
      .subscribe({
        next: (res:any) => {
          this.report = res.data
        }, error: () => {
          this.report = {
            id: 0,
            actions: [],
            in_total_value: 0,
            out_total_value: 0,
            total_value: 0,
            month: Month.JANUARY,
            year: 0
          };
        }
      });
  }

  emitFilterValue(event: { month: string; year: number }) {
    let enumName = this.stringToEnumName.translateEnumName(event.month);
    this.getReport(enumName, event.year);
  }
}
