import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Interfaces/Report';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  standalone: true,
  imports: [
    CurrencyPipe
  ]
})
export class ReportCardComponent  implements OnInit {

  @Input() report!: Report;

  constructor() { }

  ngOnInit() {}

}
