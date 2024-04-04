import { Component } from '@angular/core';
import { Month } from '../models/Month';
import { Report } from '../models/Report';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor() {}

  emitFilterValue(event: any) {
    console.log(event);
  }
}
