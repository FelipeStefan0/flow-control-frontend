import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig, CurrencyMaskModule } from 'ng2-currency-mask';

export const customCurrencyMask: CurrencyMaskConfig = {
  align: 'left',
  decimal: ',',
  allowNegative: false,
  precision: 2,
  prefix: 'R$ ',
  suffix: '',
  thousands: '.', 
}

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  declarations: [Tab2Page],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMask}
  ]
})
export class Tab2PageModule {}
