import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { ReportCardComponent } from '../components/report-card/report-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    DatepickerComponent,
    ReportCardComponent
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
