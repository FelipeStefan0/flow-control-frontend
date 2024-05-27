import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../models/Interfaces/Report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  http = inject(HttpClient)

  private endpoints = {
    root: () => `/reports`,
    report: (month: string, year: number) => `/report?month=${month}&year=${year}`
  }

  getReport(filter: {month: string, year: number}): Observable<Report> {
    return this.http.get<Report>(`${environment.server}${this.endpoints.root()}${this.endpoints.report(filter.month, filter.year)}`)
  }
}
