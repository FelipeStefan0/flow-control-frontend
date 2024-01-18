import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { Observable } from 'rxjs';
import { Month } from '../models/Month';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  year!: number;
  month!: string;

  constructor() {}

  ngOnInit() {
    this.year = new Date().getFullYear();
    // this.month = this.getMonthToString();
  }

  getMonthToString() {
    let value = Object.keys(Month).length;
    let currentMonth = new Date().getMonth();
  }

}
