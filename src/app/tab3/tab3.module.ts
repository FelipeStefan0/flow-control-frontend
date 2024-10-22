import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { ActionsCardComponent } from '../components/actions-card/actions-card.component';
import { DatepickerComponent } from '../components/datepicker/datepicker.component';
import { IonSkeletonText } from '@ionic/angular/standalone';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    ActionsCardComponent,
    DatepickerComponent,
    IonSkeletonText
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
