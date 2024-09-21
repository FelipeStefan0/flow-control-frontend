import { CommonModule, CurrencyPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Report } from 'src/app/models/Interfaces/Report';
import { IonSkeletonText } from '@ionic/angular/standalone';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss'],
  standalone: true,
  imports: [IonSkeletonText, CurrencyPipe, CommonModule],
})
export class ReportCardComponent implements OnInit {
  @Input() report!: Report;
  @Input() loading!: Boolean;

  constructor() {}

  ngOnInit() {}
}
