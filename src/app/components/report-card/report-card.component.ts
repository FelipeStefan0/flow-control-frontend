import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Report';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  standalone: true
})
export class ReportCardComponent  implements OnInit {

  @Input() report!: Report;

  constructor() { }

  ngOnInit() {}

}